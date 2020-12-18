import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class BaseUploadComponent extends BaseComponent {
  public file: any;
  public files: Set<File> = new Set();

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router) {
    super(toastr, router, authService);
  }
  protected abstract onUploadFile(): void;

  protected onAfterViewInit(): void { }
  protected onInit(): void { }
  protected onDestroy(): void { }

  public onFilesAdded() {
    this.onStartLoading();
    const selectedFiles: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in selectedFiles) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(selectedFiles[key]);
      }
    }

    if (this.files.size > 0) {
      this.onCheckFileType(this.files);
    } else {
      this.onStopLoading();
    }
  }

  public onCheckFileType(files: Set<File>) {
    files.forEach(async file => {
      var fileName = file.name;
      var idxDot = fileName.lastIndexOf('.') + 1;
      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png' || extFile == 'gif') {
        await this.onUploadFile();
      } else {
        this.files.delete(file);
        this.toastr.error('Somente arquivos jpg / jpeg / gif e png são permitidos!', 'Error');
        this.onStopLoading();
      }
    });
  }

  public addFiles() {
    this.file.nativeElement.click();
  }

  public toBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  };

}
