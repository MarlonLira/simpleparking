import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  { name: 'employee', path: '/employee/list', title: 'Employee', icon: 'engineering', visible: true },
  { name: 'scheduling', path: '/scheduling/list', title: 'Scheduling', icon: 'bookmarks', visible: true },
  { name: 'auth', path: '/auth', title: 'auth', icon: 'engineering', visible: false },
  { name: 'maps', path: '/maps', title: 'Maps', icon: 'location_on', visible: true },
  { name: 'company', path: '/company', title: 'Company', icon: 'domain', visible: false },
  { name: 'user-profile', path: '/user-profile', title: 'User Profile', icon: 'person', visible: false },
  { name: 'error', path: '/error', title: 'Page not found', icon: 'error', visible: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent {

  menuItems: any[];

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
