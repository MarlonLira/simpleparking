import { Component, ViewChild, Input } from '@angular/core';
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
  public static multiple = true;
  @ViewChild('file', { static: false }) file;

  progress;
  canBeClosed = true;
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
    if (DialogComponent.multiple) {
      const files: { [key: string]: File } = this.file.nativeElement.files;
      for (const key in files) {
        if (!isNaN(parseInt(key, 10))) {
          this.files.add(files[key]);
        }
      }
    } else {
      this.files.clear();
      const files: { [key: string]: File } = this.file.nativeElement.files;
      for (const key in files) {
        if (!isNaN(parseInt(key, 10))) {
          this.files.add(files[key]);
        }
      }
    }
  }

  addFiles() {
    if (!this.uploading) {
      this.file.nativeElement.click();
    }
  }

  uploadFiles() {
    this.uploading = true;
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
    this.progress = this.uploadService.parkingUpload(this.files, DialogComponent.id);

    const allProgressObservables = [];
    // tslint:disable-next-line: forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    forkJoin(allProgressObservables)
      .subscribe(end => {
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
        this.uploadSuccessful = true;
        this.uploading = false;
      });
  }

  closeDialog() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
  }
}
