import { Component, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingService } from 'app/services/parking.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Authentication } from 'app/commons/enums/authentication';
import { Crypto } from 'app/commons/core/crypto';
import { Utils } from 'app/commons/core/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends BaseComponent {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public parkings: Parking[];
  public selected;

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    location: Location,
    private element: ElementRef,
    public router: Router,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
    this.location = location;
    this.sidebarVisible = false;
  }

  protected onInit() {
    this.formBuild();
    this.onLoadParkings();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  formBuild(): void {
    this.form = new FormGroup({
      parkingId: new FormControl(0)
    });
  }

  private onLoadParkings() {
    this.onStartLoading();
    this.parkingService.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
        this.parkings.push({ 'id': 0, 'status': 'AT', 'name': 'N/A' } as Parking);
        this.onChangeAuth();
      });
  }

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

    if (parkingId) {
      this.reloadPage();
    }
  }

  public onChange = () => this.onChangeAuth(Number(this.form.value.parkingId));

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  };

  getTitle() {
    const titlePart = this.location.prepareExternalUrl(this.location.path()).split('/');
    const title = titlePart.length > 0 ? titlePart[1] : '';

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].name === title) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
