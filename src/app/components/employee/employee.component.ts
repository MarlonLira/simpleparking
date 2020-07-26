import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent {
  employees: Employee[];

  form = new FormGroup({
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

  constructor(
    public toastr: ToastrService,
<<<<<<< HEAD
    public authService: AuthService
=======
    public employeeService: EmployeeService,
    public authService: AuthService,
    public router: Router
>>>>>>> 2abebf4682f1446929951a0c0539bebc20969753

  ) {
    super(toastr, router, authService);
  }

  protected onInit() {
    // this.employeeService.ToList()
    //   .then((result: Employee[]) => {
    //     this.employees = result;
    //   });
  }

}
