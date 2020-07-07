import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { ParkingComponent } from '../parking.component';
import { BaseComponent } from 'app/base.component';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css']
})
export class ParkingFormComponent extends ParkingComponent {

  constructor(
    public toastr: ToastrService,
    public parkingService: ParkingService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }

  onInit(): void {

  }

  onSubmit() {
    const _value = new Parking(this.form.value);
    _value.companyId = 1;
    _value.imgUrl = 'www.google.com.br';
    const __value = { 'parking': _value };

    this.parkingService.Save(__value)
      .then(result => {
        this.toastr.info(result, '');
        this.onResetForm();
      });
  }

}
