import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import ParkingSpace from 'app/models/parking-space.model';
import { MatTableDataSource } from '@angular/material/table';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent extends BaseComponent {
  parkingSpaces: ParkingSpace[];
  public parkings: Parking[];
  public selected;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingSpaceService,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.onLoadList();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected async onLoadList(id: number = 0) {
    this.onStartLoading();
    this.parkings = await this.parkingService.toList();
    this.setParkings(this.parkings);

    if (this.isValid(id) && id === 0) {
      if (this.isValid(this.auth.employee.parkingId)) {
        this.selected = this.auth.employee.parkingId;
      } else if (this.parkings.length > 0) {
        this.selected = this.parkings[0].id;
      }
      id = this.selected;
    }

    this.parkingSpaces = await this.service.getByParkingId(id);
    this.displayedColumns = ['type', 'value', 'amount', 'actions'];
    this.dataSource = new MatTableDataSource(this.parkingSpaces);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onStopLoading();
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      value: new FormControl(0, Validators.compose([Validators.required])),
      type: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl(0, Validators.compose([Validators.required])),
      amount: new FormControl(0, Validators.compose([Validators.required])),
    });
  }

  protected setParkings = (parkings) => this.storage.setItem('_sp_parkings', JSON.stringify(parkings));
  protected getParkings = (): Parking[] => JSON.parse(this.storage.getItem('_sp_parkings')) as Parking[];

}
