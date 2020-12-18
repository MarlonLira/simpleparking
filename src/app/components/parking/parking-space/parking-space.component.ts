import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import ParkingSpace from 'app/models/parking-space.model';
import Parking from 'app/models/parking.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InnerType } from 'app/commons/core/utils';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent extends BaseComponent {

  private _parkingSpaceAssign: ParkingSpace;
  private _parkingId: number;
  public parkingSpaces: ParkingSpace[];
  public parking: Parking;

  public vehicleTypes: InnerType[] = [
    { 'value': 'CAR', 'name': 'CARRO' },
    { 'value': 'MOTORCYCLE', 'name': 'MOTO' },
    { 'value': 'BOTH', 'name': 'AMBOS' },
  ];

  constructor(
    public toastr: ToastrService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public service: ParkingSpaceService,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.onStartLoading();
    this.formBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._parkingId = Number(params['id']);
        this.form.get('parkingId').setValue(this._parkingId);
        this.onLoadList();
      }
      this.onStopLoading();
    });
  }

  protected onLoadList() {
    this.onStartLoading();
    this.service.getByParkingId(this._parkingId)
      .then((result: ParkingSpace[]) => {
        this.parkingSpaces = result;
        this.displayedColumns = ['type', 'value', 'amount', 'actions'];
        this.dataSource = new MatTableDataSource(this.parkingSpaces);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.onStopLoading();
      });
  }

  protected formBuild(): void {
    this.form = new FormGroup({
      value: new FormControl(0, Validators.compose([Validators.required])),
      amount: new FormControl(0, Validators.compose([Validators.required])),
      type: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  public getVehicleTypeName = (_value: string) => this.vehicleTypes.find(x => x.value === _value)?.name;

  protected objectBuild() {
    const obj: ParkingSpace = Object.assign({}, this._parkingSpaceAssign, this.form.value);
    obj.parkingId = this._parkingId;
    return obj;
  }

  public onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message'])
            .then(() => this.onLoadList())
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.onLoadList())
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

  public onEdit(parkingSpace: ParkingSpace) {
    this._parkingSpaceAssign = parkingSpace;
    this.onLoadForm(parkingSpace);
    this.onEditing(['type']);
  }

}
