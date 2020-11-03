import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ParkingProduct from 'app/models/parking-product.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { ParkingProductComponent } from '../parking-product.component';

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
      if (params['id']) {
        this._id = params['id'];
        this.service.getById(this._id)
          .then((result: ParkingProduct) => {
            this.onEditing(['parkingId'], result.parking.companyId);
            this.onLoadForm(result);
            this.onStopLoading();
            console.log(result)
          }).catch(error => {
            this.onStopLoading();
            this.toastr.error(error['message'], 'Error!')
          });
      }
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
