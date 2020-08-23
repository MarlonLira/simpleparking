import { Component } from '@angular/core';
import * as $ from 'jquery';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent extends BaseComponent {
  public labels = {
    error_code: '404',
    msg1: 'Uh, Ohh',
    msg2: 'Sorry we can\'t find what you are looking',
    msg3: 'for \'cuz its so dark in here'
  }

  constructor(
    toastr: ToastrService,
    authService: AuthService,
    public router: Router
  ) {
    super(toastr, router, authService);
  }

  protected onInit() {
    $(document).mousemove(function (event) {
      $('.torch').css({
        'top': event.pageY,
        'left': event.pageX
      });
    });

    document.querySelector('.cont_principal').className = 'cont_principal cont_error_active';
    this.onHideFooter();
  }

  protected onAfterViewInit(): void {
  }
  protected onDestroy(): void {
  }

  onLightUp(): void {
    $('.torch').removeClass();
    delete this.labels.msg3;
  }
  onLightDown(): void {
    this.labels.msg3 = 'for \'cuz its so dark in here';
    $('#light').addClass('torch');
  }

}
