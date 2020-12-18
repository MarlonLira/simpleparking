import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';

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
  { name: 'parking', path: '/parking/list', title: 'Estacionamento', icon: 'local_parking', visible: true },
  { name: 'employee', path: '/employee/list', title: 'Funcionário', icon: 'engineering', visible: true },
  { name: 'scheduling', path: '/scheduling/list', title: 'Agendamento', icon: 'schedule', visible: true },
  { name: 'auth', path: '/auth', title: 'auth', icon: 'engineering', visible: false },
  { name: 'maps', path: '/maps', title: 'Mapa', icon: 'location_on', visible: true },
  { name: 'company', path: '/company', title: 'Perfil da Empresa', icon: 'domain', visible: false },
  { name: 'employee-profile', path: '/employee-profile', title: 'Perfil do Funcionário', icon: 'person', visible: false },
  { name: 'settings', path: '/settings/list', title: 'Configurações', icon: 'settings', visible: true },
  { name: 'error', path: '/error', title: 'Página não encontrada', icon: 'error', visible: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent extends BaseComponent {

  menuItems: RouteInfo[];
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
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
