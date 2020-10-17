import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export abstract class AuthComponent extends BaseComponent {
  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService
  ) {
    super(toastr, router, authService)
  }

  protected abstract onSafelyInit();

  onInit(): void {
    this.verify();
    this.onSafelyInit();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  private verify() {
    if (this.auth) {
      this.redirectFor('dashboard');
    }
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

  protected signup(values): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService.signup(values)
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

  protected accountRecovery(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.accountRecovery(values)
        .then(result => {
          this.toastr.info(result['message'], 'Success');
          resolve(result);
        }).catch(error => {
          this.toastr.error(error['message'], 'Error');
          reject(error);
        });
    });
  }

}
