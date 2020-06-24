import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import Parking from '../../models/parking.model';
import { ParkingService } from '../../services/parking.service';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {

  parkings: Parking[];

  form = new FormGroup({
    name: new FormControl(''),
    registryCode: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(''),
  });

  constructor(
    public toastr: ToastrService,
    public parkingService: ParkingService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }

  onInit(): void {
    this.parkingService.ToList()
      .then((result: Parking[]) => {
        this.parkings = result;
      });
  }

  onEdit(parking) {
    console.warn('edit');
    console.log(parking)

  }

  onRemove(parking) {
    console.warn('remove');
    console.log(parking)
  }

  onSubmit() {
    const _value = new Parking(this.form.value);
    _value.companyId = 1;
    _value.imgUrl = 'www.google.com.br';
    const __value = { 'parking': _value };

    this.parkingService.Save(__value)
      .then(result => {
        this.toastr.info(result, '');
      });
  }
}
