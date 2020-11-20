import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import Employee from 'app/models/employee.model';
import { EmployeeService } from 'app/services/employee.service';
import { Utils } from 'app/commons/core/utils';
import { BaseUploadComponent } from 'app/shared/base-upload.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent extends BaseUploadComponent {
  @ViewChild('file', { static: false }) file;
  employeeAssign: Employee;
  imageUrl: string = "./assets/img/faces/empty-profile.png";

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public service: EmployeeService
  ) {
    super(toastr, authService, router);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.onLoad();
  }

  private onLoad() {
    this.formBuild();
    this.service.getById(this.auth.employee.id)
      .then((result: Employee) => {
        this.employeeAssign = result;
        this.employeeAssign.companyName = this.auth.company.name;
        this.imageUrl = result.image ? this.encodedToLink(result.image) : this.imageUrl;
        this.onLoadForm(this.employeeAssign);
        this.onStopLoading();
      });
  }

  protected onUploadFile() {
    this.files.forEach((file: File) => {
      this.toBase64(file)
        .then(async result => {
          this.imageUrl = result;
          await this.onUpdate();
          this.files.clear();
        }).catch((error: any) => this.toastr.error(error, 'Error'));
    });
  }

  formBuild(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      registryCode: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      about: new FormControl(''),
      companyName: new FormControl({ value: '', disabled: true })
    });
  }

  objectBuild() {
    const obj: Employee = Object.assign({}, this.employeeAssign, this.form.value);
    obj.image = this.imageUrl
    if (!Utils.isValid(obj.password)) {
      delete obj.password;
    }
    return obj;
  }

  onUpdate() {
    this.onStartLoading();
    this.service.update(this.objectBuild())
      .then(result => {
        this.onLoad();
        this.onStopLoading();
        this.onSuccessMessage('Saved Successfully!', result['message']);
      }).catch(error => {
        this.onErrorMessage('Error', error['message']);
        this.onStopLoading();
      });
  }
}
