import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import Consts from '../consts';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService<File> {

  constructor(public http: HttpClient) {
    super(http);
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
