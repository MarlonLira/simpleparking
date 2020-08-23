import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingComponent } from '../parking.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css']
})
export class ParkingFormComponent extends ParkingComponent {

  private _parkingAssign: Parking;
  private _id: number;

  constructor(
    public toastr: ToastrService,
    public service: ParkingService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super(toastr, router, authService, service);
  }

  onInit(): void {
    this.onStartLoading();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._id = params['id'];
        this.service.getById(this._id)
          .then((result: Parking) => {
            this.onEditing();
            this.onLoadForm(result);
            this.onStopLoading();
          }).catch(error => {
            this.onStopLoading();
            this.toastr.error(error['message'], 'Error!')
          });
      }
    });
  }

  objectBuild() {
    const obj: Parking = Object.assign({}, this._parkingAssign, this.form.value);
    obj.id = this._id;
    obj.companyId = this.auth.company.id;
    return obj;
  }

  onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message'])
            .then(() => this.redirectFor('/parking/edit', { id: requested['result'] }));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.redirectFor('/parking/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }
}
