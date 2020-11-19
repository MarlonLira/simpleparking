import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import ParkingProduct from 'app/models/parking-product.model';
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

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingProductService,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void { }
  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    this.service.toList()
      .then((result: ParkingProduct[]) => {
        this.parkingProducts = result;
        this.displayedColumns = ['name', 'description', 'value', 'actions'];
        this.dataSource = new MatTableDataSource(this.parkingProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('aqui')
        this.onStopLoading();
      });
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
