import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { Utils, Timer } from './commons/core/utils';
import { Crypto } from './commons/core/crypto';
import Auth from './models/auth.model';

@Injectable()
export abstract class BaseComponent implements OnInit {
  private static timer: Array<Timer>;
  public form: FormGroup;
  protected isValidAuthentication: boolean;
  public location: Location;
  public storage: Storage;
  protected auth: Auth;

  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) {
    this.storage = sessionStorage;
  }

  protected abstract onInit(): void;

  ngOnInit() {
    this.onShowFotter();
    this.auth = this.getAuth();
    this.timerVerify();
    this.onInit();
  }

  protected async TokenVerify(hash: string = undefined) {
    if (this.isValid(this.getToken())) {
      this.isValidAuthentication = (await this.authService.verifyToken(this.getToken())).valid;
      this.requestTokenTimer(hash);
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

  private requestTokenTimer(hash: string) {
    const _timer: Timer = {
      hash: '',
      id: ''
    }

    if (this.isValid(this.isValidAuthentication)) {
      if (!this.isValid(BaseComponent.timer)) {
        BaseComponent.timer = new Array<Timer>();
        _timer.hash = this.generateUUID();
        _timer.id = setTimeout(() => this.TokenVerify(_timer.hash), 600000); // Check the token every 10 minutes

        BaseComponent.timer.push(_timer);
      } else if (this.isValid(BaseComponent.timer) && this.isValid(hash)) {
        const found = BaseComponent.timer.find(t => t.hash === hash);

        if (this.isValid(found)) {
          clearTimeout(found.id);
          BaseComponent.timer.pop();
        }

        _timer.hash = this.generateUUID();
        _timer.id = setTimeout(() => this.TokenVerify(_timer.hash), 600000); // Check the token every 10 minutes

        BaseComponent.timer.push(_timer);
      }
    }
  }

  protected timerVerify() {
    if (!this.isValid(BaseComponent.timer) && !this.isRoute('auth')) {
      this.TokenVerify();
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

  protected destroyToken() {
    this.storage.clear();
    BaseComponent.timer = undefined;
    this.redirectFor('auth/signin');
  }

  protected getAuth = (): Auth =>
    Utils.isValid(this.storage.getItem('_sp_auth'))
      ? <Auth>JSON.parse(Crypto.Decrypt(this.storage.getItem('_sp_auth')))
      : undefined;

  protected getToken = (): string =>
    Utils.isValid(this.storage.getItem('_sp_auth'))
      ? (<Auth>JSON.parse(Crypto.Decrypt(this.storage.getItem('_sp_auth')))).token
      : undefined;

  protected isAuth = (): boolean =>
    Utils.isValid(this.storage.getItem('_sp_auth'))
      ? (<Auth>JSON.parse(Crypto.Decrypt(this.storage.getItem('_sp_auth')))).validated
      : undefined;

  protected setAuth = (auth: Auth) => this.storage.setItem('_sp_auth', Crypto.Encrypt(JSON.stringify(auth)));
  protected onResetForm = (): void => this.form.reset();
  protected onLoadForm = (values): void => this.form.patchValue(values);
  protected returnIfValid = (value, defaultValue) => Utils.returnIfValid(value, defaultValue);
  protected isValid = (value): boolean => Utils.isValid(value);
  protected generateUUID = (): string => Utils.generateUUID();
  protected redirectFor = (pathName): void => window.location.replace(`${window.location.origin}/#/${pathName}`);
  protected signOut = (): void => this.destroyToken();
  protected onHideFooter = () => $('.footer').hide();
  protected onShowFotter = () => $('.footer').show();
}
