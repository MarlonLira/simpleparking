import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Authentication } from 'app/commons/enums/authentication';
import { Utils } from 'app/commons/core/utils';
import { Crypto } from 'app/commons/core/crypto';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { FormControl, FormGroup } from '@angular/forms';

declare const $: any;
declare interface RouteInfo {
  name: string;
  path: string;
  title: string;
  icon: string;
  visible: boolean;
}

export const ROUTES: RouteInfo[] = [
  { name: 'dashboard', path: '/dashboard', title: 'Dashboard', icon: 'dashboard', visible: true },
  { name: 'parking', path: '/parking/list', title: 'Parking', icon: 'local_parking', visible: true },
  { name: 'parking-space', path: '/parking-space/list', title: 'Parking Space', icon: 'space_bar', visible: true },
  { name: 'parking-product', path: '/parking-product/list', title: 'Products & Services', icon: 'construction', visible: true },
  { name: 'employee', path: '/employee/list', title: 'Employee', icon: 'engineering', visible: true },
  { name: 'scheduling', path: '/scheduling/list', title: 'Scheduling', icon: 'schedule', visible: true },
  { name: 'auth', path: '/auth', title: 'auth', icon: 'engineering', visible: false },
  { name: 'maps', path: '/maps', title: 'Maps', icon: 'location_on', visible: true },
  { name: 'company', path: '/company', title: 'Company', icon: 'domain', visible: false },
  { name: 'user-profile', path: '/user-profile', title: 'User Profile', icon: 'person', visible: false },
  { name: 'settings', path: '/settings/list', title: 'Settings', icon: 'settings', visible: true },
  { name: 'error', path: '/error', title: 'Page not found', icon: 'error', visible: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent {

  menuItems: any[];
  public parkings: Parking[];

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public parkingService: ParkingService) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.onStartLoading();
    this.formBuild();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.onLoadParkings();
  }

  private onLoadParkings() {
    this.parkingService.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
        this.parkings = this.parkings.reverse()
        this.parkings.push({ 'id': 0, 'status': 'AT', 'name': 'N/A' } as Parking);
        this.parkings = this.parkings.reverse();
        this.onChangeAuth();
        this.onStopLoading();
      });
  }

  formBuild(): void {
    this.form = new FormGroup({
      parkingId: new FormControl(0)
    });
  }

  public onChange = () => this.onChangeAuth(Number(this.form.value.parkingId));

  private onChangeAuth(parkingId?: number) {
    this.onStartLoading();
    const _auth = this.getAuth();
    let _parkingId = Utils.isValid(parkingId) ? parkingId : (_auth.employee.parkingId ? _auth.employee.parkingId : 0);
    const _authentication = <Authentication>this.auth.authenticationLevel;

    this.form.controls['parkingId'].setValue(_parkingId);

    if (_authentication != Authentication.Developer && _authentication != Authentication.Administrator) {
      this.form.disable();
    } else {
      this.form.enable();
    }

    if (this.parkings.length > 0) {
      _auth.parking = this.parkings.find(x => x.id === _parkingId);
      _auth.employee.parkingId = _parkingId;
      this.setAuth(Crypto.encrypt(JSON.stringify(_auth)));
    }

    if (Utils.isValid(parkingId)) {
      this.reloadPage();
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
