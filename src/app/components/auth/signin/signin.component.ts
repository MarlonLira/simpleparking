import { Component } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import Auth from 'app/models/auth.model';
import Employee from 'app/models/employee.model';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends AuthComponent {
  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }

  protected onSafelyInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public async onSubmit() {
    const _auth = new Auth();
    _auth.employee = new Employee(this.form.value);
    await this.signin(_auth)
      .then((result: Auth) => {
        this.setAuth(result);
      });

    this.TokenVerify();
  }
}
