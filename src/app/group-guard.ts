import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import Auth from './models/auth.model';

@Injectable({ providedIn: 'root' })
export class GroupGuard implements CanActivate {

  constructor(private authService: AuthService,
    public router: Router,
    public toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify();
  }

  private verify(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const _auth: Auth = this.authService.getAuthentication();
      if (_auth.authenticationLevel > 2) {
        this.toastr.warning(`The profile your user is in does not have access to that area of ​​the application.
        If in doubt, contact your system administrator`, 'Error');
        resolve(false);
      }
    });
  }
}
