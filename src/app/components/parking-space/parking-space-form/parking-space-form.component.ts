import { Component } from '@angular/core';
import { ParkingSpaceComponent } from '../parking-space.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import ParkingSpace from 'app/models/parking-space.model';
import { ParkingSpaceService } from 'app/services/parking-space.service';

@Component({
  selector: 'app-parking-space-form',
  templateUrl: './parking-space-form.component.html',
  styleUrls: ['./parking-space-form.component.css']
})
export class ParkingSpaceFormComponent extends ParkingSpaceComponent {

  private _parkingSpaceAssign: ParkingSpace;
  private _id: number;

  public types: any = [
    { 'value': 'CAR', 'name': 'CAR' },
    { 'value': 'MOTORCYCLE', 'name': 'MOTORCYCLE' },
    { 'value': 'BOTH', 'name': 'BOTH' },
  ]

  constructor(
    public toastr: ToastrService,
    public service: ParkingSpaceService,
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
        this.onEditing(['parkingId', 'type']);
        this._parkingSpaceAssign = new ParkingSpace(params);
        this.onLoadForm(this._parkingSpaceAssign);
      }
      this.onStopLoading();
    });
  }

  objectBuild() {
    const obj: ParkingSpace = Object.assign({}, this._parkingSpaceAssign, this.form.value);
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
          this.onSuccessMessage('Saved Successfully!', requested['message'])
            .then(() => this.redirectFor('/parking-space/list'));
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
            .then(() => this.redirectFor('/parking-space/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

}
