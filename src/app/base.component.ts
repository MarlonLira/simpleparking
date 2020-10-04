import { OnInit, Injectable, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { Utils, Timer } from './commons/core/utils';
import { Crypto } from './commons/core/crypto';
import Auth from './models/auth.model';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { Router, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Injectable()
export abstract class BaseComponent implements AfterViewInit, OnDestroy, OnInit {
  private static timer: Array<Timer>;
  protected isValidAuthentication: boolean;
  protected auth: Auth;
  public location: Location;
  public storage: Storage;
  public form: FormGroup;
  public isEditing = false;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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

  protected abstract onAfterViewInit(): void;
  protected abstract onInit(): void;
  protected abstract onDestroy(): void;
  protected formBuild(): void { };

  ngOnDestroy = (): void => this.onDestroy();
  ngAfterViewInit = (): void => this.onAfterViewInit();

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
      } else if (!this.isValidAuthentication) {
        this.destroyToken();
      }
    } else {
      this.destroyToken(false);
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

  protected tableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected onEditing(disabledFields = [], companyId = 0) {
    let isValid = true;
    if (companyId > 0) {
      isValid = this.auth.company.id === companyId ? true : false;
      if (!isValid) {
        this.toastr.error('Error!', 'Oops !. The internet address you are trying to access is not part of your company!');
        this.redirectFor('/error');
      }
    }

    $('#list').removeClass('active');
    this.isEditing = true;
    if (disabledFields.length > 0) {
      disabledFields.forEach((value) => {
        this.form.controls[value].disable();
      });
    }
  }

  protected destroyToken(isAuthenticated = true) {
    this.storage.clear();
    BaseComponent.timer = undefined;

    if (isAuthenticated) {
      this.toastr.info('Your connection has expired!', 'Info');
    }

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
  protected signOut = (): void => this.destroyToken(false);
  protected onHideFooter = () => $('.footer').hide();
  protected onShowFotter = () => $('.footer').show();
  protected onStartLoading = () => $('#pn-load').removeClass('not-load');
  protected onStopLoading = () => $('#pn-load').addClass('not-load');
  protected onConfirmMessage = () => Swal.fire(this.onConfirmMessageConfig);
  protected onSuccessMessage = (title: string, message?: string) => Swal.fire(title, message, 'success');
  protected onErrorMessage = (title: string, message?: string) => Swal.fire(title, message, 'error');
  protected encodedToLink = (encoded: any): string => atob(encoded);
}
