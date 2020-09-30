import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import RouteSecurity from 'app/models/route-security.model';
import { AuthService } from 'app/services/auth.service';
import { RouteSecurityService } from 'app/services/route-security.service';
import { RuleService } from 'app/services/rule.service';
import { ToastrService } from 'ngx-toastr';
import { SettingsComponent } from '../settings.component';

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.css']
})
export class SettingsItemComponent extends SettingsComponent {
  public step = 0;
  public routeSecurityAssign: RouteSecurity;
  public formGroup: FormGroup

  @Input() public id: any;
  @Input() public title: string;
  @Input() public icon: string;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: RouteSecurityService,
    public ruleService: RuleService
  ) {
    super(toastr, router, authService, service, ruleService);
    this.formBuild();
  }

  formBuild(): void {
    this.formGroup = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      route: new FormControl({ value: '', disabled: true }),
      ruleId: new FormControl(0),
      companyId: new FormControl(0),
    });
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

  teste(row) {
    console.log(row)
  }

  objectBuild() {
    const obj: RouteSecurity = Object.assign({}, this.routeSecurityAssign, this.form.value);
    obj.id = this.id;
    obj.companyId = this.auth.company.id;
    return obj;
  }

  onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message']);
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.redirectFor('/employee/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }
}
