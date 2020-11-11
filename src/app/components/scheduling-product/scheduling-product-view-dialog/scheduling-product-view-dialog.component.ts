import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import SchedulingProduct from 'app/models/scheduling-product.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import { SchedulingProductService } from 'app/services/scheduling-product.service';
import { ToastrService } from 'ngx-toastr';
import { SchedulingProductComponent } from '../scheduling-product.component';

@Component({
  selector: 'app-scheduling-product-view-dialog',
  templateUrl: './scheduling-product-view-dialog.component.html',
  styleUrls: ['./scheduling-product-view-dialog.component.css']
})
export class SchedulingProductViewDialogComponent extends SchedulingProductComponent {
  public static scheduling: SchedulingProduct;

  constructor(
    public dialogRef: MatDialogRef<SchedulingProductViewDialogComponent>,
    public dialog: MatDialog,
    public service: SchedulingProductService,
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public parkingService: ParkingService,
    public parkingProductService: ParkingProductService
  ) {
    super(toastr, router, authService, service, parkingService, parkingProductService);
  }

  protected onInit(): void {
    this.formBuild();
    this.onLoadForm(SchedulingProductViewDialogComponent.scheduling);
  }

  closeDialog = () => this.dialogRef.close();
}
