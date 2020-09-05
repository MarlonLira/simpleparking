import { Component } from '@angular/core';
import { SchedulingComponent } from '../scheduling.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SchedulingService } from 'app/services/scheduling.service';
import { ParkingService } from 'app/services/parking.service';
import { ParkingSpaceService } from 'app/services/parking-space.service';

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
    public service: SchedulingService,
    public parkingService: ParkingService,
    public parkingSpaceService: ParkingSpaceService
  ) {
    super(toastr, router, authService, service, parkingService, parkingSpaceService);
  }

  onView(row) {
    this.onErrorMessage('Error', 'Method not implemented!');
  }

  onChange(parkingId) {
    this.onLoadList(parkingId);
  }
}
