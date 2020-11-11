import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import ParkingProduct from 'app/models/parking-product.model';

import Parking from 'app/models/parking.model';
import SchedulingProduct from 'app/models/scheduling-product.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';


import { SchedulingProductService } from 'app/services/scheduling-product.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheduling-product',
  templateUrl: './scheduling-product.component.html',
  styleUrls: ['./scheduling-product.component.css']
})
export class SchedulingProductComponent extends BaseComponent {

  public schedulingProducts: SchedulingProduct[];
  public parkings: Parking[];
  public parkingProducts: ParkingProduct[];
  public selected;
  public vacancies = 0;
  public occupiedVacancies = 0;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: SchedulingProductService,
    public parkingService: ParkingService,
    public parkingProductService: ParkingProductService
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

    if (this.isValid(id) && id === 0) {
      if (this.isValid(this.auth.employee.parkingId)) {
        this.selected = this.auth.employee.parkingId;
      } else if (this.parkings.length > 0) {
        this.selected = this.parkings[0].id;
      }
      id = this.selected;
    }

    if (this.isValid(id) && id > 0) {
      this.schedulingProducts = await this.service.getBySchedulingId(id);
      this.parkingProducts = await this.parkingProductService.getByParkingId(id);
    }

    this.displayedColumns = ['id', 'value', 'parkingProduct', 'scheduling'];
    this.dataSource = new MatTableDataSource(this.schedulingProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.occupiedVacancies = this.schedulingProducts.length;
    this.onStopLoading();
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      value: new FormControl({ value: '', disabled: true }),
      parkingProduct: new FormControl({value: '', disabled: true}),
      scheduling: new FormControl({value: '', disabled: true}),
    });
  }
}
