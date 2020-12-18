import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import ParkingProduct from 'app/models/parking-product.model';
import Parking from 'app/models/parking.model';
import { AuthService } from 'app/services/auth.service';
import { ParkingProductService } from 'app/services/parking-product.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parking-product',
  templateUrl: './parking-product.component.html',
  styleUrls: ['./parking-product.component.css']
})
export class ParkingProductComponent extends BaseComponent {

  private _parkingId: number;
  private _parkingProductAssign: ParkingProduct;
  public parkingProducts: ParkingProduct[];
  public parkings: Parking[];

  constructor(
    public toastr: ToastrService,
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public service: ParkingProductService,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.onStartLoading();
    this.onLoadList();
    this.formBuild();
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this._parkingId = params['id'];
        this.form.get('parkingId').setValue(params['id']);
        this.onLoadList();
      }
      this.onStopLoading();
    });
  }

  protected onLoadList() {
    this.onStartLoading();
    this.service.getByParkingId(this._parkingId)
      .then((result: ParkingProduct[]) => {
        this.parkingProducts = result;
        this.displayedColumns = ['name', 'value', 'description', 'actions'];
        this.dataSource = new MatTableDataSource(this.parkingProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.onStopLoading();
      });
  }

  protected formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      value: new FormControl(0, Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      parkingId: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  protected objectBuild() {
    const obj: ParkingProduct = Object.assign({}, this._parkingProductAssign, this.form.value);
    obj.parkingId = this._parkingId;
    return obj;
  }

  public onSubmit() {
    this.onStartLoading();
    if (!this.isEditing) {
      this.service.save(this.objectBuild())
        .then(requested => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', requested['message'])
            .then(() => this.onLoadList());
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    } else {
      this.service.update(this.objectBuild())
        .then(result => {
          this.onResetForm();
          this.onStopLoading();
          this.onSuccessMessage('Saved Successfully!', result)
            .then(() => this.onLoadList());
        }).catch(error => {
          this.onErrorMessage('Error', error.message);
          this.onStopLoading();
        });
    }
  }

  public onEdit(parkingProduct: ParkingProduct) {
    this._parkingProductAssign = parkingProduct;
    this.onLoadForm(parkingProduct);
    this.isEditing = true;
  }

  public onRemove(parkingProduct) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.service.delete(parkingProduct.id)
            .then(result => {
              this.onLoadList();
              this.onStopLoading();
              this.onSuccessMessage('Deleted!', result);
            });
        }
      });
  }
}
