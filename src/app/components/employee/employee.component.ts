import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Employee from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Parking from 'app/models/parking.model';
import Rule from 'app/models/rule.model';
import { RuleService } from 'app/services/rule.service';
import { ParkingService } from 'app/services/parking.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends BaseComponent {
  public employees: Employee[];
  public parkings: Parking[];
  public rules: Rule[];

  constructor(
    public toastr: ToastrService,
    public service: EmployeeService,
    public authService: AuthService,
    public parkingService: ParkingService,
    public ruleService: RuleService,
    public router: Router

  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }
  protected onInit() { }

  protected async onLoadList() {
    this.onStartLoading();
    this.service.toList()
      .then((result: Employee[]) => {
        this.employees = result;
        console.log(this.employees)
        if (this.employees) {
          this.employees.forEach((employee: Employee) => {
            employee.parking = this.returnIfValid(employee.parking, new Parking({ 'name': 'N/A' }));
          });
        }

        this.displayedColumns = ['id', 'name', 'registryCode', 'email', 'rule', 'parking', 'actions'];
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.onStopLoading();
      })

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
