import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import ParkingProduct from 'app/models/parking-product.model';
import Parking from 'app/models/parking.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parking-product',
  templateUrl: './parking-product.component.html',
  styleUrls: ['./parking-product.component.css']
})
export class ParkingProductComponent extends BaseComponent {
  parkingProducts: ParkingProduct[];
  public parkings: Parking[];
  public selected;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingProductService,
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

    if (this.isValid(id) && id === 0) {
      if (this.isValid(this.auth.employee.parkingId)) {
        this.selected = this.auth.employee.parkingId;
      } else if (this.parkings.length > 0) {
        this.selected = this.parkings[0].id;
      }
      id = this.selected;
    }

    this.parkingProducts = await this.service.getByParkingId(id);
    this.displayedColumns = ['name', 'description', 'value', 'actions'];
    this.dataSource = new MatTableDataSource(this.parkingProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onStopLoading();
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      value: new FormControl(0, Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl('', Validators.compose([Validators.required]))
    });
  }

}
