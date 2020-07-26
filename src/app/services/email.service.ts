import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import Email from 'app/models/email.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends BaseService<Email> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Send = (email: Email) => this.onPost('/email', email).toPromise();
}
