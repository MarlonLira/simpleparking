import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent extends BaseComponent {

  date: Date = new Date();

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }

  protected onInit() {

  }

}
