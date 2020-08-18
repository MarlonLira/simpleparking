import { Component, Input, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from 'app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import Upload from 'app/models/upload.model';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { Utils } from 'app/commons/core/utils';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends BaseComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  @Input() public id: any;
  @Input() public title: string;
  @Input() uploads: Upload[];

  constructor(
    public dialog: MatDialog,
    public service: UploadService,
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.onLoadList();
  }

  protected onAfterViewInit(): void {
  }
  protected onDestroy(): void {
  }

  public openUploadDialog() {
    DialogComponent.id = this.id;
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%' });
  }

  onView(file: Upload) {
    this.onErrorMessage('Error', 'Method not implemented!')
  }

  onRemove(file: Upload) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.onLoadList();
          this.onStopLoading();
          this.onErrorMessage('Error', 'Method not implemented!')
        }
      });
  }

  protected onLoadList(_id: number = 0) {
    if (_id > 0) {
      this.id = Utils.isValid(this.id) ? this.id : _id;
    }

    if (Utils.isValid(this.id)) {
      this.service.toList(this.id)
        .then((result: Upload[]) => {
          this.uploads = result;
          this.dtTrigger.next();
        })
        .catch((error: any) => this.toastr.error(error.message, 'Error'));
    }
  }

  refreshTable(): void {
    $('#tblUpload').DataTable().destroy();
    this.onLoadList();
  }

}
