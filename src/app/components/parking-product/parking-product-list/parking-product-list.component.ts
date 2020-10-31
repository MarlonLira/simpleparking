import { Component } from '@angular/core';
import { ParkingProductComponent } from '../parking-product.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import ParkingProduct from 'app/models/parking-product.model';

@Component({
  selector: 'app-parking-product-list',
  templateUrl: './parking-product-list.component.html',
  styleUrls: ['./parking-product-list.component.css']
})
export class ParkingProductListComponent extends ParkingProductComponent {

  constructor(
    public toastr: ToastrService,
    public service: ParkingProductService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService, service, parkingService);
  }

  onChange(parkingId) {
    this.onLoadList(parkingId);
  }

  onEdit(parkingProduct: ParkingProduct) {
    this.redirectFor('/parking-product/edit',
      { type: parkingProduct.name, amount: parkingProduct.description, parkingId: parkingProduct.parkingId, value: parkingProduct.value });
  }

}
