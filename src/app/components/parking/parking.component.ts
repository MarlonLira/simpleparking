import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {
  parkings: Parking[];

  form = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }),
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
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    super(toastr, authService, dialog);
  }

  onInit(): void {
  }
}
