import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { Utils } from './commons/functions/utils';

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

  protected abstract onInit(): void;

  ngOnInit() {
    this.onShowFotter();
    this.TokenVerify();
    this.onInit();
  }

  protected async TokenVerify() {
    if (this.isValid(this.getToken())) {
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

  protected setToken(token) {
    this.storage.setItem('_sp_token', token);
    this.storage.setItem('_sp_isAuth', 'true');
  }

  protected destroyToken() {
    this.storage.clear();
    this.redirectFor('auth/signin');
  }

  protected onResetForm = (): void => this.form.reset();
  protected onLoadForm = (values): void => this.form.patchValue(values);
  protected returnIfValid = (value, defaultValue) => Utils.returnIfValid(value, defaultValue);
  protected isValid = (value): boolean => Utils.isValid(value);
  protected redirectFor = (pathName): void => window.location.replace(`${window.location.origin}/#/${pathName}`);
  protected getToken = (): string => this.storage.getItem('_sp_token');
  protected isAuth = (): boolean => Boolean(this.storage.getItem('_sp_isAuth'));
  protected signOut = (): void => this.destroyToken();
  protected onHideFooter = () => $('.footer').hide();
  protected onShowFotter = () => $('.footer').show();
}
