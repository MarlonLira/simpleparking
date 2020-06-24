import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends AuthComponent {

  constructor(
    public toastr: ToastrService
  ) {
    super(toastr);
  }

  protected onSafelyInit() {
    throw new Error('Method not implemented.');
  }

}
