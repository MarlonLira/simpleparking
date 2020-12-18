import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { InnerType } from 'app/commons/core/utils';
import { ParkingPrice } from 'app/models/parking-price.models';
import { AuthService } from 'app/services/auth.service';
import { ParkingPriceService } from 'app/services/parking-price.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parking-price',
  templateUrl: './parking-price.component.html',
  styleUrls: ['./parking-price.component.css']
})
export class ParkingPriceComponent extends BaseComponent {

  private _parkingId: number;
  private _parkingPriceAssign: ParkingPrice;

  public vehicleTypes: InnerType[] = [
    { 'value': 'CAR', 'name': 'CARRO' },
    { 'value': 'MOTORCYCLE', 'name': 'MOTO' },
    { 'value': 'BOTH', 'name': 'AMBOS' },
  ];

  public periods: InnerType[] = [
    { 'value': 'OVERTIME', 'name': 'HORA EXTRA' },
    { 'value': 'HOUR', 'name': 'HORA' },
    { 'value': 'DAY', 'name': 'DIA' },
    { 'value': 'WEEK', 'name': 'SEMANA' },
    { 'value': 'MONTH', 'name': 'MÊS' },
    { 'value': 'YEAR', 'name': 'ANO' },
  ];

  constructor(
    public toastr: ToastrService,
    public service: ParkingPriceService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
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
        this._parkingId = params['id'];
        this.form.get('parkingId').setValue(params['id']);
        this.onLoadList();
      }
      this.onStopLoading();
    });
  }

  protected onLoadList() {
    this.onStartLoading();
    this.service.getByParkingId(this._parkingId)
      .then((parkingPrice: ParkingPrice[]) => {
        this.displayedColumns = ['period', 'unit', 'vehicleType', 'value', 'actions'];
        this.dataSource = new MatTableDataSource(parkingPrice);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.onStopLoading();
      })
  }

  protected formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      unit: new FormControl(1, Validators.compose([Validators.required])),
      period: new FormControl('', Validators.compose([Validators.required])),
      value: new FormControl(0, Validators.compose([Validators.required])),
      vehicleType: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  public getVehicleTypeName = (_value: string) => this.vehicleTypes.find(x => x.value === _value)?.name;
  public getPeriodName = (_value: string) => this.periods.find(x => x.value === _value)?.name;

  protected objectBuild() {
    const obj: ParkingPrice = Object.assign({}, this._parkingPriceAssign, this.form.value);
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
            .then(() => this.onLoadList());
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
            .then(() => this.onLoadList());
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

  public onEdit(parkingPrice: ParkingPrice) {
    this._parkingPriceAssign = parkingPrice;
    this.onLoadForm(parkingPrice);
    this.isEditing = true;
  }

}

