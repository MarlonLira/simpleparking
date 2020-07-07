import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthComponent } from '../auth.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Employee from 'app/models/employee.model';
import Company from 'app/models/company.model';
import Auth from 'app/models/auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends AuthComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }

  protected onSafelyInit() {
    this.form = new FormGroup({
      valid: new FormControl(''),
      employee: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        registryCode: new FormControl('', [Validators.required, Validators.email, Validators.minLength(11)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      }),
      company: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        registryCode: new FormControl('', [Validators.required, Validators.email, Validators.minLength(14)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(11)])
      })
    });
  }

  public async onSubmit() {
    this.onStartLoading();
    const _auth = new Auth();
    _auth.company = new Company(this.form.controls['company'].value);
    _auth.employee = new Employee(this.form.controls['employee'].value);
    await this.signup(_auth)
      .then((result: string) => {
        this.onStopLoading();
      })
      .catch(error => {
        this.onStopLoading();
      });
  }

}
