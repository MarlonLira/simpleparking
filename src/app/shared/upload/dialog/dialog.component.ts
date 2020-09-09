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
    const selectedFiles: { [key: string]: File } = this.file.nativeElement.files;
    selectedFiles.name
    if (DialogComponent.multiple) {
      for (const key in selectedFiles) {
        if (!isNaN(parseInt(key, 10))) {
          this.files.add(selectedFiles[key]);
        }
      }
    } else {
      this.files.clear();
      for (const key in selectedFiles) {
        if (!isNaN(parseInt(key, 10))) {
          this.files.add(selectedFiles[key][0]);
        }
        break;
      }
    }
    this.checkFileType(this.files);
  }

  checkFileType(files: Set<File>) {
    files.forEach(file => {
      var fileName = file.name;
      var idxDot = fileName.lastIndexOf('.') + 1;
      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png' || extFile == 'gif') {

      } else {
        this.files.delete(file);
        this.toastr.error('Only jpg/jpeg/gif and png files are allowed!', 'Error')
      }
    })
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
