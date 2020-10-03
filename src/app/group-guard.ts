import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import Auth from './models/auth.model';
import { Utils } from './commons/core/utils';
import Rule from './models/rule.model';

@Injectable({ providedIn: 'root' })
export class GroupGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router,
    public toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.verify(state);
  }

  private verify(state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let isAccessAllowed = false;
      const _auth: Auth = this.authService.getAuthentication();
      let routeSecurity = _auth ? _auth.routeSecurity : [];
      let obj = routeSecurity.find(x => x.route == state.url);
      if (Utils.isValid(_auth)) {

        if (Utils.isValid(obj)) {
          let rule = Utils.returnIfValid(obj.rule, new Rule({ 'level': 5 }));
          if (Utils.isValid(_auth.authenticationLevel)) {
            isAccessAllowed = _auth.authenticationLevel <= rule.level ? true : false;
          }
        } else {
          isAccessAllowed = true;
        }

        if (!isAccessAllowed) {
          this.toastr.warning(`The profile your user is in does not have access to that area of ​​the application.
            If in doubt, contact your system administrator`, 'Error');
          resolve(false);
        } else {
          resolve(true);
        }
      } else {
        this.toastr.warning(`Your authentication cannot be verified, update the page and try again!`, 'Error');
        resolve(false);
      }
    });
  }
}
