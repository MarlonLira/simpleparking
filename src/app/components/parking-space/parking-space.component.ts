import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ParkingSpaceService } from 'app/services/parking-space.service';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css']
})
export class ParkingSpaceComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: ParkingSpaceService
  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void {

  }

  protected onInit(): void {

  }

  protected onDestroy(): void {

  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      value: new FormControl(0, Validators.compose([Validators.required])),
      type: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl(0, Validators.compose([Validators.required])),
      amount: new FormControl(0, Validators.compose([Validators.required])),
    });
  }

}
