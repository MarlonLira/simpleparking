import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingComponent } from '../parking.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css']
})
export class ParkingFormComponent extends ParkingComponent {

  private _parkingAssign: Parking;

  constructor(
    public toastr: ToastrService,
    public parkingService: ParkingService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    super(toastr, authService, dialog);
  }

  onInit(): void {

  }

  objectBuild() {
    const obj: Parking = Object.assign({}, this._parkingAssign, this.form.value);
    const result = { 'parking': {} };
    obj.imgUrl = 'www.google.com.br';
    obj.companyId = this.auth.company.id;
    result.parking = obj;
    return result;
  }

  onSubmit() {
    this.parkingService.Save(this.objectBuild())
      .then(result => {
        this.toastr.info(result, '');
        this.onResetForm();
      });
  }

}
