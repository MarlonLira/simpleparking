import { Component } from '@angular/core';
import { SchedulingComponent } from '../scheduling.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SchedulingService } from 'app/services/scheduling.service';

@Component({
  selector: 'app-scheduling-list',
  templateUrl: './scheduling-list.component.html',
  styleUrls: ['./scheduling-list.component.css']
})
export class SchedulingListComponent extends SchedulingComponent {

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: SchedulingService
  ) {
    super(toastr, router, authService, service);
  }

  onInit(): void {
    this.onLoadList();
  }

}
