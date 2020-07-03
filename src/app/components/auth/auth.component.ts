import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import Auth from 'app/models/auth.model';

@Injectable()
export abstract class AuthComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) { super(toastr, authService) }

  protected abstract onSafelyInit();

  onInit(): void {
    this.onSafelyInit();
  }

  protected signin(values): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService.signin(values)
        .then(requested => {
          this.toastr.success(requested['message'], 'Success');
          resolve(requested['result']);
        })
        .catch(error => {
          this.toastr.error(error['message'], 'Error');
          reject(error);
        });
    });
  }

}
