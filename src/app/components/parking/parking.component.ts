import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {
  parkings: Parking[];

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void { }
  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    console.log('hedaj')
    this.service.toList()
      .then((result: Parking[]) => {
        console.log(result)
        this.parkings = result;
        this.displayedColumns = ['name', 'registryCode', 'phone', 'email', 'address', 'actions'];
        this.dataSource = new MatTableDataSource(this.parkings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      name: new FormControl(''),
      registryCode: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl(''),
      email: new FormControl(''),
      imgUrl: new FormControl(''),
      address: new FormGroup({
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
      }, Validators.compose([Validators.required]))
    });
  }
}
