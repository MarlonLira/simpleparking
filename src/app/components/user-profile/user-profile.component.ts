import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }

  onInit() {
    this.form = new FormGroup({
      name: new FormControl('Marlon Lira'),
      registryCode: new FormControl('091.773.504-80'),
      phone: new FormControl('(81) 9 85856666'),
      email: new FormControl('marlon@gmail.com'),
      adress: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      company: new FormControl({ value: 'SSTEC', disabled: true })
    });
  }

  protected onAfterViewInit(): void {
  }
  protected onDestroy(): void {
  }

}
