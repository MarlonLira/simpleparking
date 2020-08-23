import { Component } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from 'app/services/email.service';
import { EmployeeService } from 'app/services/employee.service';
import { Router } from '@angular/router';
import Employee from 'app/models/employee.model';
import Auth from 'app/models/auth.model';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css']
})
export class AccountRecoveryComponent extends AuthComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public emailService: EmailService,
    public employeeService: EmployeeService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }
  protected onSafelyInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      registryCode: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public async onSubmit() {
    this.onStartLoading();
    try {
      const _values = new Auth();
      _values.employee = new Employee(this.form.value);
      await this.accountRecovery(_values);
      this.onStopLoading();
    } catch (error) {
      this.toastr.error(error, 'Error');
      this.onStopLoading();
    }
  }

}
