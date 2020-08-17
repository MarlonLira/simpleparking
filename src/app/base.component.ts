import { OnInit, Injectable, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { Utils, Timer } from './commons/core/utils';
import { Crypto } from './commons/core/crypto';
import Auth from './models/auth.model';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { Router, ActivatedRoute, ParamMap, Params, RouterStateSnapshot } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable()
export abstract class BaseComponent implements OnInit {
  private static timer: Array<Timer>;
  public form: FormGroup;
  public isEditing = false;
  protected isValidAuthentication: boolean;
  public location: Location;
  public storage: Storage;
  protected auth: Auth;

  private onConfirmMessageConfig: SweetAlertOptions = {
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService
  ) {
    this.storage = sessionStorage;
  }

  protected abstract onInit(): void;

  ngOnInit() {
    this.onStartLoading();
    this.onShowFotter();
    this.auth = this.getAuth();
    this.timerVerify();
    this.onInit();
    this.onStopLoading();
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

  protected onEditing() {
    $('#list').removeClass('active');
    this.isEditing = true;
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

  protected setAuth = (auth: string) => this.storage.setItem('_sp_auth', auth);
  protected onResetForm = (): void => this.form.reset();
  protected onLoadForm = (values): void => this.form.patchValue(values);
  protected returnIfValid = (value, defaultValue) => Utils.returnIfValid(value, defaultValue);
  protected isValid = (value): boolean => Utils.isValid(value);
  protected generateUUID = (): string => Utils.generateUUID();
  protected redirectFor = (route: string, params: Params = {}) => this.router.navigate([route], { queryParams: params });
  protected signOut = (): void => this.destroyToken();
  protected onHideFooter = () => $('.footer').hide();
  protected onShowFotter = () => $('.footer').show();
  protected onStartLoading = () => $('#pn-load').removeClass('not-load');
  protected onStopLoading = () => $('#pn-load').addClass('not-load');
  protected onConfirmMessage = () => Swal.fire(this.onConfirmMessageConfig);
  protected onSuccessMessage = (title: string, message?: string) => Swal.fire(title, message, 'success');
  protected onErrorMessage = (title: string, message?: string) => Swal.fire(title, message, 'error');
  protected getRoute = () => window.location.toString();
  protected getSelfRoute = () => (this.getRoute().split('#'))[1];
  protected routeReload() {
    const selfRoute = this.getSelfRoute().split('?');
    let _route: string;
    let _params: any;

    if (selfRoute[0]) {
      _route = selfRoute[0];
    }
    if (selfRoute[1]) {
      const httpParams = new HttpParams({ fromString: this.getRoute().split('?')[1] });
      const _id = Number(selfRoute[1].split('id=')[1]);
      _params = { id: _id };
    }

    this.redirectFor(_route, _params)
  }
}
