import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from 'app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @Input() public id: any;
  constructor(public dialog: MatDialog, public uploadService: UploadService) { }

  public openUploadDialog() {
    DialogComponent.id = this.id;
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%' });
  }
}
