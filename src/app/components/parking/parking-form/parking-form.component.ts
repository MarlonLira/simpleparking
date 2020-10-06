import { Component } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import Parking from 'app/models/parking.model';
import { ParkingComponent } from '../parking.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericAddressService } from 'app/services/generic-address.service';
import GenericAddress from 'app/models/generic-address.model';
import ParkingAddress from 'app/models/parking-address.model';

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
    public genericAdressService: GenericAddressService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super(toastr, router, authService, service);
  }

  onInit(): void {
    this.onStartLoading();
    this.formBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._id = params['id'];
        this.service.getById(this._id)
          .then((result: Parking) => {
            this.onEditing([], result.companyId);
            this.onLoadForm(result);
            this.onStopLoading();
          }).catch(error => {
            this.onStopLoading();
            this.toastr.error(error['message'], 'Error!')
          });
      }
    });
  }

  objectBuild() {
    const obj: Parking = Object.assign({}, this._parkingAssign, this.form.value);
    obj.id = this._id;
    obj.companyId = this.auth.company.id;
    return obj;
  }

  searchAddress(zipCode) {
    if (this.form.controls.address.get('zipCode').valid) {
      this.onStartLoading();
      this.genericAdressService.getByZipCode(zipCode)
        .then((result: GenericAddress) => {
          if (!result.erro) {
            let _address = new ParkingAddress();
            _address.zipCode = this.genericAdressService.formatterZipCode(result.cep);
            _address.city = result.localidade;
            _address.district = result.bairro;
            _address.country = 'Brasil';
            _address.complement = result.complemento;
            _address.street = result.logradouro;
            _address.state = result.uf;
            this.form.controls.address.patchValue(_address);
            this.onStopLoading();
          } else {
            this.toastr.warning('The address was not found with that zip code!', 'Not Found');
            this.onStopLoading();
          }
        }).catch(error => {
          this.toastr.error(error, 'Error');
          this.onStopLoading();
        });
    }
  }

  onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message'])
            .then(() => this.redirectFor('/parking/edit', { id: requested['result'] }));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onLoadList();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.redirectFor('/parking/list'));
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }
}
