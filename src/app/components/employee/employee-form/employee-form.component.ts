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

  constructor(
    public toastr: ToastrService,
    public employeeService: EmployeeService,
    public parkingService: ParkingService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, employeeService, authService, router);
    parkingService.ToList()
      .then(result => {
        this.parkings = result;
      })
  }

  onSubmit() {
    this.onStartLoading();
    const _value = new Employee(this.form.value);
    _value.companyId = this.authService.getAuthentication().company.id;
    const __value = { 'employee': _value };
    this.employeeService.Save(__value)
      .then(result => {
        this.toastr.info(result, '');
        this.onStopLoading();
        this.onResetForm();
      }).catch(error => {
        this.toastr.error(error, '');
        this.onStopLoading();
      })
  }

}
