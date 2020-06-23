import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BaseComponent } from 'app/base.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent {
  employees: Employee[];

  constructor(
    public toastr: ToastrService,
    public employeeService: EmployeeService

  ) {
    super(toastr);
  }

  protected onInit() {
    this.employeeService.ToList()
      .then((result: Employee[]) => {
        this.employees = result;
      });
  }

}
