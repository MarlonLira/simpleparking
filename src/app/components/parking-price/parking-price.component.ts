import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { ParkingPrice } from 'app/models/parking-price.models';
import Parking from 'app/models/parking.model';
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
  parkingPrices: ParkingPrice[];
  public parkings: Parking[];
  public selected;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingPriceService,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.onLoadList();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected async onLoadList() {
    this.onStartLoading();
    this.parkings = await this.parkingService.toList();
    this.parkingPrices = await this.service.getByParkingId();
    this.displayedColumns = ['period', 'unit', 'vehicleType', 'value', 'actions'];
    this.dataSource = new MatTableDataSource(this.parkingPrices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onStopLoading();
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      unit: new FormControl(1, Validators.compose([Validators.required])),
      period: new FormControl('', Validators.compose([Validators.required])),
      value: new FormControl(0, Validators.compose([Validators.required])),
      vehicleType: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl('', Validators.compose([Validators.required]))
    });
  }

}
