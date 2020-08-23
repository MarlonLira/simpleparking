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
import Upload from 'app/models/upload.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService<File> {

  constructor(public http: HttpClient) {
    super(http);
  }

  public toList(id: number): Promise<Upload[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/uploads/parkingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
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
}
