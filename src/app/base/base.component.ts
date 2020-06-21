import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import Consts from '../consts';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private http: HttpClient,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onPost(value: any, path: string): Promise<any> {
    return new Promise((resolve) => {
      this.http.post(`${Consts.API_URL}/${path}`, value)
        .subscribe(requested => {
          resolve(requested);
        });
    });
  }

}
