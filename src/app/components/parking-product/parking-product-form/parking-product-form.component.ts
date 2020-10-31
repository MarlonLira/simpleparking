import { Component } from '@angular/core';
import { ParkingProductComponent } from '../parking-product.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import ParkingProduct from 'app/models/parking-product.model';
import { ParkingProductService } from 'app/services/parking-product.service';

@Component({
  selector: 'app-parking-product-form',
  templateUrl: './parking-product-form.component.html',
  styleUrls: ['./parking-product-form.component.css']
})
export class ParkingProductFormComponent extends ParkingProductComponent {

  private _parkingProductAssign: ParkingProduct;
  private _id: number;

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
    this.onStartLoading();
    this.onLoadList();
    this.formBuild();
    this.route.queryParams.subscribe(params => {
      if (params['parkingId']) {
        this.onEditing(['parkingId']);
        this._parkingProductAssign = new ParkingProduct(params);
        this.onLoadForm(this._parkingProductAssign);
      }
      this.onStopLoading();
    });
  }

  objectBuild() {
    const obj: ParkingProduct = Object.assign({}, this._parkingProductAssign, this.form.value);
    obj.id = this._id;
    return obj;
  }

  onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message']);
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
            .then(() => this.redirectFor('/parking-product/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

}
