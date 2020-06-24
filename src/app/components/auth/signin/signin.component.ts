import { Component } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends AuthComponent {
  constructor(
    toastr: ToastrService
  ) {
    super(toastr);
  }

  protected onSafelyInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public onSubmit() {
    console.log('aquii')
    this.createAuth('_sp_isAuth', true);
    this.redirectFor('dashboard')
  }

}
