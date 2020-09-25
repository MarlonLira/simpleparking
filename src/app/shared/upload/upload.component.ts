import { Component, Input, ViewChild } from '@angular/core';
import { UploadService } from 'app/services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import Upload from 'app/models/parking-file.model';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { Utils } from 'app/commons/core/utils';
import { MatTableDataSource } from '@angular/material/table';
import ParkingFile from 'app/models/parking-file.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends BaseComponent {
  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();

  @Input() public id: any;
  @Input() public title: string;
  @Input() multiple: boolean;

  constructor(
    public dialog: MatDialog,
    public service: UploadService,
    public toastr: ToastrService,
    public authService: AuthService,
    public uploadService: UploadService,
    public router: Router) {
    super(toastr, router, authService);
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

  protected onInit(): void {
    this.onLoadList();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    if (Utils.isValid(this.id)) {
      this.service.toList(this.id)
        .then((result: ParkingFile[]) => {
          this.displayedColumns = ['id', 'name', 'type', 'actions'];
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        .catch((error: any) => this.toastr.error(error.message, 'Error'));
    }
  }

  onView(file: ParkingFile) {
    var binaryData = [];
    binaryData.push(file.encoded);
    const url = window.URL.createObjectURL(new Blob(binaryData, { type: file.type }));
    console.log(url);
  }

  onFilesAdded() {
    const selectedFiles: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in selectedFiles) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(selectedFiles[key]);
      }
    }
    this.checkFileType(this.files);
  }

  checkFileType(files: Set<File>) {
    files.forEach(async file => {
      var fileName = file.name;
      var idxDot = fileName.lastIndexOf('.') + 1;
      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png' || extFile == 'gif') {
        await this.uploadFiles();
      } else {
        this.files.delete(file);
        this.toastr.error('Only jpg/jpeg/gif and png files are allowed!', 'Error')
      }
    })
  }

  addFiles() {
    this.onStartLoading();
    this.file.nativeElement.click();
  }

  uploadFiles() {
    return new Promise((resolve, reject) => {
      let count = 0;
      this.files.forEach(async (file: File) => {
        count++;
        const upload = new ParkingFile();
        upload.encoded = file;
        upload.name = file.name;
        upload.type = file.type;
        upload.parkingId = this.id;
        this.uploadService.save(upload)
          .then((requested: any) => {
            if (count == this.files.size) {
              this.onLoadList();
              this.onSuccessMessage('Saved Successfully!', requested['message']);
              this.onStopLoading();
              resolve(requested);
            }
          }).catch((error: any) => {
            this.onErrorMessage('Error', error.message);
            this.onStopLoading();
            reject(error);
          })
      });
    });
  }

  public toBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    })
  };


  public blobToBase64(blob: Blob) {
    console.log(blob)
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  toBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.toBase64(file)
        .then(b64 => {
          console.log(b64)
          this.b64toBlob(b64)
            .then((blob: Blob) => resolve(blob))
            .catch(error => reject(error));
        }).catch(error => reject(error));
    })

  }

  public b64toBlob(base64Image): Promise<Blob> {
    return new Promise((resolve) => {
      const parts = base64Image.split(';base64,');

      // Hold the content type
      const imageType = parts[0].split(':')[1];

      // Decode Base64 string
      const decodedData = window.atob(parts[1]);

      // Create UNIT8ARRAY of size same as row data length
      const uInt8Array = new Uint8Array(decodedData.length);

      // Insert all character code into uInt8Array
      for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
      }

      // Return BLOB image after conversion
      resolve(new Blob([uInt8Array], { type: imageType }));
    })
  }


}
