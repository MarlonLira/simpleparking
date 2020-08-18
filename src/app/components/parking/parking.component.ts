import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { Router } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {
  private static _selectedParking: Parking;
  parkings: Parking[];
  readonly maxSize = 104857600;

  form = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl(''),
    registryCode: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl(''),
    email: new FormControl(''),
    imgUrl: new FormControl(''),
    file: new FormControl(
      undefined,
      [Validators.required, FileValidator.maxContentSize(this.maxSize)]
    ),
    adress: new FormGroup({
      id: new FormControl(0),
      city: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      street: new FormControl(''),
      district: new FormControl(''),
      complement: new FormControl(''),
      zipCode: new FormControl(''),
      number: new FormControl(0),
      latitude: new FormControl(0),
      longitude: new FormControl(0),
    })
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

  protected onAfterViewInit(): void {
  }
  protected onDestroy(): void {
  }

  protected onLoadList() {
    this.service.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
        this.dtTrigger.next();
      });
  }
}
