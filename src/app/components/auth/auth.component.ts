import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BaseComponent } from 'app/base.component';

@Injectable()
export abstract class AuthComponent extends BaseComponent {
  
  constructor(
    public toastr: ToastrService
  ) { super(toastr) }

  protected abstract onSafelyInit();

  onInit(): void {
    this.onSafelyInit();
  }

}
