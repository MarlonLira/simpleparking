import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent {
  private static _selectedEmployee: Employee;
  employees: Employee[];

  constructor(
    public toastr: ToastrService,
    public employeeService: EmployeeService,
    public authService: AuthService,
    public router: Router

  ) {
    super(toastr, router, authService);
  }

  protected onSelectedEmployee = (employee: Employee) => EmployeeComponent._selectedEmployee = employee;
  protected SelectedEmployee = () => EmployeeComponent._selectedEmployee;
  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }
  protected onInit() { }

  protected onLoadList() {
    this.employeeService.toList()
      .then((result: Employee[]) => {
        console.log(result);
        this.employees = result;
        this.displayedColumns = ['id', 'name', 'registryCode', 'phone', 'email', 'actions'];
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      name: new FormControl(''),
      registryCode: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      ruleId: new FormControl(''),
      parkingId: new FormControl(''),
    });
  }

}
