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

  protected signin(values): Promise<Auth> {
    return new Promise((resolve) => {
      this.authService.signin(values)
        .then(requested => {
          this.toastr.success(requested['message']);
          resolve(requested['result']);
        });
    });
  }

}
