import { Component } from '@angular/core';
import { SchedulingComponent } from '../scheduling.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { SchedulingService } from 'app/services/scheduling.service';
import { ParkingService } from 'app/services/parking.service';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import { MatDialog } from '@angular/material/dialog';
import { SchedulingViewDialogComponent } from '../scheduling-view-dialog/scheduling-view-dialog.component';

@Component({
  selector: 'app-scheduling-list',
  templateUrl: './scheduling-list.component.html',
  styleUrls: ['./scheduling-list.component.css']
})
export class SchedulingListComponent extends SchedulingComponent {

  constructor(
    public dialog: MatDialog,
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
    SchedulingViewDialogComponent.scheduling = row;
    let dialogRef = this.dialog.open(SchedulingViewDialogComponent, { width: '50%' });
  }

  onChange(parkingId) {
    this.onLoadList(parkingId);
  }
}
