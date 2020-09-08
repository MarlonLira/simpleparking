import { Component, OnInit } from '@angular/core';
import Employee from 'app/models/employee.model';
import { EmployeeComponent } from '../employee.component';
import { EmployeeService } from 'app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import Parking from 'app/models/parking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends EmployeeComponent {

  public rules: any = [
    { 'id': 1, 'status': 'AT', 'name': 'ADM MASTER', 'level': 1 },
    { 'id': 2, 'status': 'AT', 'name': 'ADM', 'level': 2 },
    { 'id': 3, 'status': 'AT', 'name': 'FUNCIONARIO', 'level': 3 },
  ]

  public parkings: Parking[];
  public employeeAssign: Employee;

  constructor(
    public toastr: ToastrService,
    public service: EmployeeService,
    public parkingService: ParkingService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, service, authService, router);
  }

  onInit() {
    this.formBuild();
    this.parkingService.toList()
      .then(result => {
        this.parkings = result;
      })
  }

  objectBuild() {
    const obj: Employee = Object.assign({}, this.employeeAssign, this.form.value);
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
            .then(() => this.redirectFor('/parking-space/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

}
