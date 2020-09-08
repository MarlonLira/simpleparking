import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'app/services/employee.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { EmployeeComponent} from '../employee.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent extends EmployeeComponent {

  constructor(
    public toastr: ToastrService,
    public service: EmployeeService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, service, authService, router);
  }

  onInit(): void {
    this.onLoadList();
  }

  onEdit(employee) {
    this.onSelectedEmployee(employee);
    this.redirectFor('/employee/edit', { id: employee.id });
  }

  onRemove(employee) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.service.delete(employee.id)
            .then(result => {
              this.onLoadList();
              this.onStopLoading();
              this.onSuccessMessage('Deleted!', result);
            });
        }
      });
  }

}
