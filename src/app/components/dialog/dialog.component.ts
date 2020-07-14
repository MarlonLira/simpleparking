import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }
  
  protected onInit(): void {
  }


}
