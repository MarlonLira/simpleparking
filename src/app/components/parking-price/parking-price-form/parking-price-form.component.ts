import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingPrice } from 'app/models/parking-price.models';
import { AuthService } from 'app/services/auth.service';
import { ParkingPriceService } from 'app/services/parking-price.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { ParkingPriceComponent } from '../parking-price.component';

@Component({
  selector: 'app-parking-price-form',
  templateUrl: './parking-price-form.component.html',
  styleUrls: ['./parking-price-form.component.css']
})
export class ParkingPriceFormComponent extends ParkingPriceComponent {

  private _parkingPriceAssign: ParkingPrice;
  private _id: number;

  public vehicleTypes: any = [
    { 'value': 'CAR', 'name': 'CAR' },
    { 'value': 'MOTORCYCLE', 'name': 'MOTORCYCLE' },
    { 'value': 'BOTH', 'name': 'BOTH' },
  ]

  public periods: any = [
  { 'value': 'OVERTIME', 'name': 'OVERTIME' },
  { 'value': 'HOUR', 'name': 'HOUR' },
  { 'value': 'DAY', 'name': 'DAY' },
  { 'value': 'WEEK', 'name': 'WEEK' },
  { 'value': 'MONTH', 'name': 'MONTH' },
  { 'value': 'YEAR', 'name': 'YEAR' },
  ]

  constructor(
    public toastr: ToastrService,
    public service: ParkingPriceService,
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
          .then((result: ParkingPrice) => {
            this.onEditing(['parkingId', 'vehicleType', 'period' ], result.parking.companyId);
            this.onLoadForm(result);
            this.onStopLoading();
            console.log(result)
          }).catch(error => {
            this.onStopLoading();
            this.toastr.error(error['message'], 'Error!')
          });
      } else {
        this.onStopLoading();
      }
    });
  }

  objectBuild() {
    const obj: ParkingPrice = Object.assign({}, this._parkingPriceAssign, this.form.value);
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
            .then(() => this.redirectFor('/parking-price/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

}
