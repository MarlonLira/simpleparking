import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent extends BaseComponent {
  public parkings: Parking[];
  public isOnEditing = false;
  public _parkingId = 0;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingService,
    public route: ActivatedRoute,
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isOnEditing = true;
        this._parkingId = Number(params['id']);
      } else {
        this.isOnEditing = false;
        this._parkingId = 0;
      }
    });
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    this.onStartLoading();
    this.service.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
        this.displayedColumns = ['name', 'registryCode', 'phone', 'email', 'address', 'actions'];
        this.dataSource = new MatTableDataSource(this.parkings);
        this.dataSource.sort = this.sort;
        this.onStopLoading();
      });
  }

  public onRedirect(path) {
    if (this._parkingId > 0) {
      this.redirectFor(`/parking/${path}`, { id: this._parkingId });
    }
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      name: new FormControl('', Validators.compose([Validators.required])),
      registryCode: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      address: new FormGroup({
        id: new FormControl(0),
        city: new FormControl('', Validators.compose([Validators.required])),
        country: new FormControl({ value: 'Brasil', disabled: false }),
        state: new FormControl('', Validators.compose([Validators.required])),
        street: new FormControl('', Validators.compose([Validators.required])),
        district: new FormControl('', Validators.compose([Validators.required])),
        complement: new FormControl(''),
        zipCode: new FormControl('', Validators.compose([Validators.required])),
        number: new FormControl(0, Validators.compose([Validators.required])),
        latitude: new FormControl(0, Validators.compose([Validators.required])),
        longitude: new FormControl(0, Validators.compose([Validators.required])),
      }),
    });
  }
}
