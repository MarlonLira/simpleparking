import { Component } from '@angular/core';
import { Router } from '@angular/router';
import RouteSecurity from 'app/models/route-security.model';
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

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: RouteSecurityService,
    public ruleService: RuleService
  ) {
    super(toastr, router, authService, service, ruleService);
  }

  onSave(item: RouteSecurity) {
    this.onStartLoading();
    if (!this.isValid(item.id) || item.id == 0) {
      this.service.save(item)
        .then(result => {
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result);
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(item)
        .then(result => {
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result);
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

  onChange(row, ruleId) {
    const routeSecurity = new RouteSecurity(row);
    routeSecurity.ruleId = ruleId;
    routeSecurity.companyId = this.auth.company.id;
    delete routeSecurity.rule;
    this.onSave(routeSecurity);
  }

}
