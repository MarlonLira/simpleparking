import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingComponent } from '../parking.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.css']
})
export class ParkingFormComponent extends ParkingComponent {

  private _parkingAssign: Parking;
  private _id: number;

  constructor(
    public toastr: ToastrService,
    public service: ParkingService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super(toastr, router, authService, service);
  }

  onInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._id = params['id'];
        this.onEditing();
        this.onLoadForm(this.SelectedParking());
      }
    });
  }

  objectBuild() {
    const obj: Parking = Object.assign({}, this._parkingAssign, this.form.value);
    obj.id = this._id;
    obj.imgUrl = 'www.google.com.br';
    obj.companyId = this.auth.company.id;
    return obj;
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        //this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.Save(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.redirectFor('/parking/list'));
        });
    } else {
      this.service.Update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.redirectFor('/parking/list'));
        });
    }
  }
}
