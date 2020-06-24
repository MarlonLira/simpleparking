import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location, PopStateEvent } from '@angular/common';
import { isArray, isString, isNullOrUndefined } from 'util';

@Injectable()
export abstract class BaseComponent implements OnInit {
  public form: FormGroup;
  protected isAuthenticated: boolean;
  public location: Location;
  public storage: Storage;

  constructor(
    public toastr: ToastrService
  ) { }

  protected abstract onInit();

  ngOnInit() {
    this.authVerify();
    this.onInit();
  }

  private authVerify() {
    this.isAuthenticated = this.IsValid(localStorage.getItem('_sp_isAuth'));
    if (this.isAuthenticated && this.isRoute('auth')) {
      this.redirectFor('dashboard')
    } else if (!this.isAuthenticated && !this.isRoute('auth')) {
      this.redirectFor('auth/signin')
    }
  }

  public createAuth(valueName, value) {
    this.storage = localStorage;
    this.storage.setItem(valueName, value)
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

  public redirectFor(pathName) {
    console.log(pathName)
    const path = `${window.location.origin}/#/${pathName}`;
    window.location.replace(path);
  }
}
