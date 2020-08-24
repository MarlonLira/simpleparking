import { Component, OnInit } from '@angular/core';

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
  { name: 'employee', path: '/employee', title: 'Employee', icon: 'engineering', visible: true },
  { name: 'auth', path: '/auth', title: 'auth', icon: 'engineering', visible: false },
  { name: 'maps', path: '/maps', title: 'Maps', icon: 'location_on', visible: true },
  { name: 'company', path: '/company', title: 'Company', icon: 'domain', visible: true },
  { name: 'user-profile', path: '/user-profile', title: 'User Profile', icon: 'person', visible: true },
  { name: 'error', path: '/error', title: 'Page not found', icon: 'error', visible: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
