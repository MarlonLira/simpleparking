import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { Utils } from 'app/commons/core/utils';
import { Authentication } from 'app/commons/enums/authentication';
import Parking from 'app/models/parking.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { Crypto } from 'app/commons/core/crypto';

@Component({
  selector: 'app-parkings-select',
  templateUrl: './parkings-select.component.html',
  styleUrls: ['./parkings-select.component.css']
})
export class ParkingsSelectComponent extends BaseComponent {

  public parkings: Parking[];

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public parkingService: ParkingService) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.onStartLoading();
    this.formBuild();
    this.onLoadParkings();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  private onLoadParkings() {
    this.parkingService.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
        this.parkings = this.parkings.reverse()
        this.parkings.push({ 'id': 0, 'status': 'AT', 'name': 'N/A' } as Parking);
        this.parkings = this.parkings.reverse();
        this.onChangeAuth();
        this.onStopLoading();
      });
  }

  formBuild(): void {
    this.form = new FormGroup({
      parkingId: new FormControl(0)
    });
  }

  public onChange = () => this.onChangeAuth(Number(this.form.value.parkingId));

  private onChangeAuth(parkingId?: number) {
    this.onStartLoading();
    const _auth = this.getAuth();
    let _parkingId = Utils.isValid(parkingId) ? parkingId : (_auth.employee.parkingId ? _auth.employee.parkingId : 0);
    const _authentication = <Authentication>this.auth.authenticationLevel;

    this.form.controls['parkingId'].setValue(_parkingId);

    if (_authentication != Authentication.Developer && _authentication != Authentication.Administrator) {
      this.form.disable();
    } else {
      this.form.enable();
    }

    if (this.parkings.length > 0) {
      _auth.parking = this.parkings.find(x => x.id === _parkingId);
      _auth.employee.parkingId = _parkingId;
      this.setAuth(Crypto.encrypt(JSON.stringify(_auth)));
    }

    if (Utils.isValid(parkingId)) {
      this.reloadPage();
    }
  }

}
