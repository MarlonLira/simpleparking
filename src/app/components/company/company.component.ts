import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }
  protected onAfterViewInit(): void { }

  protected onInit(): void {
    this.form = new FormGroup({
      name: new FormControl('SSTEC'),
      registryCode: new FormControl('54.902.513/0001-17'),
      phone: new FormControl('(81) 9 88887777'),
      email: new FormControl('SSTEC@gmail.com'),
      adress: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
    });
  }

  protected onDestroy(): void { }
}
