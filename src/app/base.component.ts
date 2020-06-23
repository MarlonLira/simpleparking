import { OnInit, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export abstract class BaseComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public toastr: ToastrService
  ) { }

  protected abstract onInit();

  ngOnInit() {
    this.onInit();
  }
}
