import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { isArray, isString, isNullOrUndefined } from 'util';
import { AuthService } from './services/auth.service';
import * as $ from 'jquery';

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
    this.storage = localStorage;
  }

  protected abstract onInit();

  ngOnInit() {
    this.onShowFotter();
    this.TokenVerify();
    this.onInit();
  }

  protected async TokenVerify() {
    if (this.IsValid(this.getToken())) {
      this.isValidAuthentication = (await this.authService.verifyToken(this.getToken())).valid;
      console.log(this.isValidAuthentication)
      if (this.isValidAuthentication && this.isRoute('auth')) {
        this.redirectFor('dashboard')
      } else if (!this.isValidAuthentication && !this.isRoute('auth')) {
        this.destroyToken();
      } else if (!this.isValidAuthentication && this.isRoute('auth')) {
        this.destroyToken();
      }
    } else {
      this.destroyToken();
    }
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
    if (!isNullOrUndefined(value) && value !== '') {
      result = value;
    }
    return result;
  }

  protected setToken(token) {
    this.storage.setItem('_sp_token', token);
    this.storage.setItem('_sp_isAuth', 'true');
  }

  protected destroyToken() {
    this.storage.clear();
    this.redirectFor('auth/signin');
  }

  public redirectFor = (pathName): void => window.location.replace(`${window.location.origin}/#/${pathName}`);
  protected getToken = (): string => this.storage.getItem('_sp_token');
  protected isAuth = (): boolean => Boolean(this.storage.getItem('_sp_isAuth'));
  protected signOut = (): void => this.destroyToken();
  protected onHideFooter = () => $('.footer').hide();
  protected onShowFotter = () => $('.footer').show();
}
