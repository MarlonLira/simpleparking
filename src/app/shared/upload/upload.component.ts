import { Component, Input, ViewChild } from '@angular/core';
import { ParkingFileService } from 'app/services/parking-file.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { Utils } from 'app/commons/core/utils';
import { MatTableDataSource } from '@angular/material/table';
import ParkingFile from 'app/models/parking-file.model';
import { DialogViewComponent } from './dialog-view/dialog-view.component';
import { BaseUploadComponent } from '../base-upload.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends BaseUploadComponent {
  @ViewChild('file', { static: false }) file;

  @Input() public id: any;
  @Input() public title: string;

  constructor(
    public dialog: MatDialog,
    public service: ParkingFileService,
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router) {
    super(toastr, authService, router);
  }

  protected onInit(): void {
    this.onLoadList();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    if (Utils.isValid(this.id)) {
      this.service.getByParkingId(this.id)
        .then((result: ParkingFile[]) => {
          this.displayedColumns = ['id', 'name', 'type', 'actions'];
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        .catch((error: any) => this.toastr.error(error.message, 'Error'));
    }
  }

  async onView(file: ParkingFile) {
    this.setImageForViewing(file);
    let dialogRef = this.dialog.open(DialogViewComponent, { width: '50%',  height: '90%'});
  }

  onRemove(file: ParkingFile) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.service.delete(file.id)
            .then(result => {
              this.onLoadList();
              this.onStopLoading();
              this.onSuccessMessage('Deleted!', result);
            });
        }
      });
  }

  protected onUploadFile() {
    return new Promise((resolve, reject) => {
      let count = 0;
      this.files.forEach(async (file: File) => {
        count++;
        const upload = new ParkingFile();
        upload.encoded = await this.toBase64(file);
        upload.name = file.name;
        upload.type = file.type;
        upload.parkingId = this.id;
        this.service.save(upload)
          .then((requested: any) => {
            if (count == this.files.size) {
              this.files.clear();
              this.onLoadList();
              this.onSuccessMessage('Saved Successfully!', requested['message']);
              this.onStopLoading();
              resolve(requested);
            }
          }).catch((error: any) => {
            this.files.clear();
            this.onErrorMessage('Error', error.message);
            this.onStopLoading();
            reject(error);
          })
      });
    });
  }

  protected setImageForViewing = (image) => this.storage.setItem('_sp_img_viewing', JSON.stringify(image));
  protected getImageForViewing = (): ParkingFile => new ParkingFile(JSON.parse(this.storage.getItem('_sp_img_viewing')));
}
