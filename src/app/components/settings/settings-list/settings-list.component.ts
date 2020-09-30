import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { RouteSecurityService } from 'app/services/route-security.service';
import { RuleService } from 'app/services/rule.service';
import { ToastrService } from 'ngx-toastr';
import { SettingsComponent } from '../settings.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent extends SettingsComponent {
  panelOpenState = false;
  step = 0;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: RouteSecurityService,
    public ruleService: RuleService
  ) {
    super(toastr, router, authService, service, ruleService);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  teste(row){
    console.log(row)
  }

}
