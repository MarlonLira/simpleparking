import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import Employee from 'app/models/employee.model';
import { EmployeeService } from 'app/services/employee.service';
import { Utils } from 'app/commons/core/utils';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent extends BaseComponent {

  employeeAssign: Employee;
  imageUrl: string = "./assets/img/faces/empty-profile.png";

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public service: EmployeeService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.formBuild();
    this.service.getById(this.auth.employee.id)
      .then((result: Employee) => {
        this.employeeAssign = result;
        this.employeeAssign.company = this.auth.company.name;
        this.imageUrl = this.returnIfValid(result.imageUrl, this.imageUrl);
        this.onLoadForm(this.employeeAssign);
      })
  }

  formBuild(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      registryCode: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      about: new FormControl(''),
      company: new FormControl({ value: '', disabled: true })
    });
  }

  objectBuild() {
    const obj: Employee = Object.assign({}, this.employeeAssign, this.form.value);
    if(!Utils.isValid(obj.password)){
      delete obj.password;  
    }
    return obj;
  }

  onUpdate() {
    this.onStartLoading();
    this.service.update(this.objectBuild())
      .then(result => {
        this.onStopLoading();
        this.onSuccessMessage('Saved Successfully!', result['message']);
      }).catch(error => {
        this.onErrorMessage('Error', error['message']);
        this.onStopLoading();
      });
  }

  protected onAfterViewInit(): void {

  }
  protected onDestroy(): void {
  }

}
