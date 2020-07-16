import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {
  private static _selectedParking: Parking;
  parkings: Parking[];

  form = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl(''),
    registryCode: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(''),
  });

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onSelectedParking(parking: Parking) {
    ParkingComponent._selectedParking = parking;
  }

  protected SelectedParking = () => ParkingComponent._selectedParking;



  onInit(): void {
    this.redirectFor('parking/list');
  }

  protected onLoadList() {
    this.service.ToList()
      .then((result: Parking[]) => {
        this.parkings = result;
      });
  }
}
