import { Component, OnInit } from '@angular/core';
import { ParkingComponent } from '../parking.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import Parking from 'app/models/parking.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'app/components/dialog/dialog.component';
import { ParkingFormComponent } from '../parking-form/parking-form.component';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent extends ParkingComponent {

  constructor(
    public toastr: ToastrService,
    public parkingService: ParkingService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    super(toastr, authService, dialog);
  }

  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;

  //   this.dialog.open(ParkingFormComponent, dialogConfig);
  // }

  onInit(): void {
    this.parkingService.ToList()
      .then((result: Parking[]) => {
        this.parkings = result;
      });
  }

  onEdit(parking) {
    this.onLoadForm(parking);
    this.openDialog(ParkingFormComponent);
  }

  onRemove(parking) {
    this.parkingService.Delete(parking.id)
      .then(result => {
        this.toastr.success(result);
      });
  }
}
