import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ParkingProduct from 'app/models/parking-product.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { ParkingProductComponent } from '../parking-product.component';

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

  onInit(): void {
    this.onLoadList();
  }

  onEdit(parkingProduct: ParkingProduct) {
    this.redirectFor('/parking-product/edit', { id: parkingProduct.id });
  }

  onRemove(parkingProduct) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.service.delete(parkingProduct.id)
            .then(result => {
              this.onLoadList();
              this.onStopLoading();
              this.onSuccessMessage('Deleted!', result);
            });
        }
      });
  }

}
