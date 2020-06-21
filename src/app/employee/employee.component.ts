import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Employee from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(
    public employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeService.ToList()
      .then((result: Employee[]) => {
        this.employees = result;
      });
  }

}
