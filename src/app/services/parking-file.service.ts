import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { BaseService } from './base.service';
import ParkingFile from 'app/models/parking-file.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingFileService extends BaseService<ParkingFile> {

  constructor(public http: HttpClient) {
    super(http);
  }

  public getByParkingId(id: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      this.onGet(`/parkingFiles/parkingId/${id}`)
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onDelete(`/parkingFile/${id}`)
        .subscribe(
          (requested) => resolve(requested['message']),
          (e) => reject(e.error)
        );
    });
  }

  public save(values: ParkingFile): Promise<any> {
    return new Promise((resolve, reject) => {
      this.onPost('/parkingFile', values)
        .subscribe(
          (requested) => resolve(requested),
          (e) => reject(e.error)
        );
    });
  }

  public encodeImages(files: Set<File>, id: number) {
    return new Promise((resolve, reject) => {
      let result: any;
      files.forEach(async (file: File) => {
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

  public toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    })
  }

}
