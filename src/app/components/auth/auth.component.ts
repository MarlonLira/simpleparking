import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends BaseComponent{

  constructor(
    public toastr: ToastrService
  ) { super(toastr) }

  onInit(): void {
  }

}
