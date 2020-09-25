import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import Consts from '../consts';
import ParkingFile from 'app/models/parking-file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService<ParkingFile> {

  constructor(public http: HttpClient) {
    super(http);
  }

  public toList(id: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/uploads/parkingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  save(values: ParkingFile): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingFile', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  public parkingUpload(files: Set<File>, id): { [key: string]: { progress: Observable<number> } } {
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append(id, file, file.name);

      const req = new HttpRequest('POST', `${Consts.API_URL}/parking/upload`, formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();
      const startTime = new Date().getTime();
      this.http.request(req)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            progress.complete();
          }
        });
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }

  public encodeImages(files: Set<File>, id: number) {
    return new Promise((resolve, reject) => {
      let result: any;
      files.forEach((file: File) => {
        const upload = new ParkingFile();
        upload.encoded = file;
        upload.name = file.name;
        upload.type = file.type;
        upload.parkingId = id;
        this.save(upload)
          .then(result => resolve(result))
          .catch(error => reject(error))
      });
      resolve(result);
    });
  }

  public toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    })
  };

}
