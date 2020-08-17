import { Component, ViewChild } from '@angular/core';

import { forkJoin } from 'rxjs';
import { UploadService } from 'app/services/upload.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../upload.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent extends UploadComponent {
  public static id: any;
  @ViewChild('file', { static: false }) file;

  progress;
  canBeClosed = true;
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  public files: Set<File> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService,
    public dialog: MatDialog,
    public service: UploadService,
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router) {
    super(dialog, uploadService, toastr, authService, router);
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    this.uploading = true;
    this.progress = this.uploadService.parkingUpload(this.files, DialogComponent.id);
    for (let key in this.progress) {
      this.progress[key].progress
        .subscribe(val => console.log(val));
    }

    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.showCancelButton = false;

    forkJoin(allProgressObservables)
      .subscribe(end => {
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
        this.uploadSuccessful = true;
        this.uploading = false;
        this.dialogRef.close();
        this.onSuccessMessage('Upload Successfully!', '')
            .then(() => this.routeReload());
      });
  }
}
