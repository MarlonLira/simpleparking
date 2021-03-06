import { Component } from '@angular/core';
import Employee from 'app/models/employee.model';
import { EmployeeComponent } from '../employee.component';
import { EmployeeService } from 'app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RuleService } from 'app/services/rule.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends EmployeeComponent {

  public employeeAssign: Employee;
  private _id: number;

  constructor(
    public toastr: ToastrService,
    public service: EmployeeService,
    public parkingService: ParkingService,
    public ruleService: RuleService,
    public authService: AuthService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    super(toastr, service, authService, parkingService, ruleService, router);
  }

  onInit() {
    this.onStartLoading();
    this.onLoadSelects();
    this.formBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._id = params['id'];
        this.service.getById(this._id)
          .then((result: Employee) => {
            this.onEditing([], result.companyId);
            this.onLoadForm(result);
            this.onStopLoading();
          }).catch(error => {
            this.onStopLoading();
            this.toastr.error(error['message'], 'Error!')
          });
      }
    });
  }

  async onLoadSelects() {
    try {
      this.rules = await this.ruleService.toList();
      this.parkings = await this.parkingService.toList();
      this.onStopLoading()
    } catch (error) {
      this.toastr.error(error, 'Error!');
    }
  }

  objectBuild() {
    const obj: Employee = Object.assign({}, this.employeeAssign, this.form.value);
    obj.id = this._id;
    obj.companyId = this.auth.company.id;
    obj.parkingId = Number(obj.parkingId) === 0 ? undefined : obj.parkingId;
    return obj;
  }

  onSubmit() {
    this.onStartLoading();
    let isValidate = false;
    isValidate = this.form.value.password === this.form.value.confirmPassword;
    if (isValidate) {
      if (!this.isEditing) {
        this.service.save(this.objectBuild())
          .then(requested => {
            this.onResetForm();
            this.onStopLoading();
            this.onSuccessMessage('Saved Successfully!', requested);
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
    } else {
      this.onErrorMessage('Erro', 'As senhas não coincidem.');
      this.onStopLoading();
    }
  }

}
