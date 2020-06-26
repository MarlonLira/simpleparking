import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  visible: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', visible: true },
  { path: '/parking', title: 'Parking', icon: 'local_parking', visible: true },
  { path: '/employee', title: 'Employee', icon: 'engineering', visible: true },
  { path: '/auth', title: 'auth', icon: 'engineering', visible: false },
  { path: '/user-profile', title: 'User Profile', icon: 'person', visible: true },
  { path: '/maps', title: 'Maps', icon: 'location_on', visible: true },
  { path: '/error', title: 'Page not found', icon: 'error', visible: false },
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
