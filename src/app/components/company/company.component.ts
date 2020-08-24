import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Company from 'app/models/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent extends BaseComponent {

  company: Company;


  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }

  protected onInit(): void {
    this.company = new Company(this.auth.company);
    this.formBuild();
    this.onLoadForm(this.company);
  }

  protected onDestroy(): void { }

  formBuild(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      registryCode: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      adress: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
    });
  }
}
