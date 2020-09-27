import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Company from 'app/models/company.model';
import { CompanyService } from 'app/services/company.service';
import { BaseUploadComponent } from 'app/shared/base-upload.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent extends BaseUploadComponent {
  @ViewChild('file', { static: false }) file;
  companyAssign: Company;
  imageUrl: string = "./assets/img/sstec.png";

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public service: CompanyService
  ) {
    super(toastr, authService, router);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.onLoad();
  }

  private onLoad() {
    this.onStartLoading();
    this.formBuild();
    this.service.getById(this.auth.company.id)
      .then((result: Company) => {
        this.companyAssign = result;
        this.imageUrl = result.image ? this.encodedToLink(result.image) : this.imageUrl;
        this.onLoadForm(result);
        this.onStopLoading();
      }).catch(error => {
        this.toastr.error(error['message'], 'Error');
        this.onStopLoading();
      });
  }

  protected onUploadFile(): void {
    this.files.forEach((file: File) => {
      this.toBase64(file)
        .then(async result => {
          this.imageUrl = result;
          await this.onUpdate();
          this.files.clear();
        }).catch((error: any) => this.toastr.error(error, 'Error'));
    })
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      registryCode: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      about: new FormControl(''),
      adress: new FormGroup({
        id: new FormControl(0),
        city: new FormControl(''),
        country: new FormControl(''),
        state: new FormControl(''),
        street: new FormControl(''),
        district: new FormControl(''),
        complement: new FormControl(''),
        zipCode: new FormControl(''),
        number: new FormControl(0),
      })
    });
  }

  objectBuild() {
    const obj: Company = Object.assign({}, this.companyAssign, this.form.value);
    obj.image = this.imageUrl
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
