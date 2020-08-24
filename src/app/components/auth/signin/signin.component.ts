import { Component } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Auth from 'app/models/auth.model';
import Employee from 'app/models/employee.model';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends AuthComponent {
  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }

  protected onSafelyInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public async onSubmit() {
    this.onStartLoading();
    const _auth = new Auth();
    _auth.employee = new Employee(this.form.value);
    this.signin(_auth)
      .then((result: string) => {
        this.setAuth(result);
        this.onStopLoading();
        this.TokenVerify();
      })
      .catch(() => this.onStopLoading());
  }
}
