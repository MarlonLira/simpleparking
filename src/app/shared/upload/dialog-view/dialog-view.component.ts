import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ParkingFileService } from 'app/services/parking-file.service';
import { ToastrService } from 'ngx-toastr';
import { UploadComponent } from '../upload.component';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent extends UploadComponent {

  public imageUrl: any;
  public name: string;

  constructor(
    public dialogRef: MatDialogRef<DialogViewComponent>,
    public dialog: MatDialog,
    public service: ParkingFileService,
    public toastr: ToastrService,
    public authService: AuthService,
    public uploadService: ParkingFileService,
    public router: Router
  ) {
    super(dialog, service, toastr, authService, router);
  }

  protected onInit(): void {
    const file = this.getImageForViewing();
    this.imageUrl = file.toLink();
    this.name = file.name;
  }

  expand() {
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${this.imageUrl}" >`;
  }

  closeDialog = () => this.dialogRef.close();
}
