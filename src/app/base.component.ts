import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { isArray, isString, isNullOrUndefined } from 'util';
import { AuthService } from './services/auth.service';

@Injectable()
export abstract class BaseComponent implements OnInit {
  public form: FormGroup;
  protected isValidAuthentication: boolean;
  public location: Location;
  public storage: Storage;

  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) {
  }

  protected abstract onInit();

  ngOnInit() {
    this.TokenVerify();
    this.onInit();
  }

  protected async TokenVerify() {
    if (this.IsValid(this.getToken())) {
      this.isValidAuthentication = (await this.authService.verifyToken(this.getToken())).valid;
      if (this.isValidAuthentication && this.isRoute('auth')) {
        this.redirectFor('dashboard')
      } else if (!this.isValidAuthentication && !this.isRoute('auth')) {
        this.destroyToken();
        this.redirectFor('auth/signin');
      }
    } else {
      this.redirectFor('auth/signin')
    }
  }

  protected setToken(token) {
    this.storage = localStorage;
    this.storage.setItem('_sp_token', token);
    this.storage.setItem('_sp_isAuth', 'true');
  }

  protected getToken(): string {
    this.storage = localStorage;
    return this.storage.getItem('_sp_token');
  }

  protected destroyToken() {
    this.storage = localStorage;
    this.storage.clear();
  }

  protected isAuth() {
    return this.storage.getItem('_sp_isAuth');
  }

  protected isRoute(path) {
    const route = window.location.toString();
    const isRoute = new RegExp(`/.*?${path}.*/`);
    if (isRoute.test(route)) {
      return true;
    } else {
      return false;
    }
  }

  public IsValid(value) {
    if (isArray(value)) {
      return value.length > 0 ? true : false;
    }

    if (isString(value)) {
      return value !== '' ? true : false;
    }
    return (!isNullOrUndefined(value)) ? true : false;
  }

  ReturnIfValid(value, defaultValue) {
    let result = defaultValue;
    if (!isNullOrUndefined(value) && value != '') {
      result = value;
    }
    return result;
  }

  public redirectFor(pathName) {
    const path = `${window.location.origin}/#/${pathName}`;
    window.location.replace(path);
  }
}
