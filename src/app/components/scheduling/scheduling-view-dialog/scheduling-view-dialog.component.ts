import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SchedulingService } from 'app/services/scheduling.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { SchedulingComponent } from '../scheduling.component';
import { ParkingService } from 'app/services/parking.service';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import Scheduling from 'app/models/scheduling.model';

@Component({
  selector: 'app-scheduling-view-dialog',
  templateUrl: './scheduling-view-dialog.component.html',
  styleUrls: ['./scheduling-view-dialog.component.css']
})
export class SchedulingViewDialogComponent extends SchedulingComponent {
  public static scheduling: Scheduling;

  constructor(
    public dialogRef: MatDialogRef<SchedulingViewDialogComponent>,
    public dialog: MatDialog,
    public service: SchedulingService,
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public parkingService: ParkingService,
    public parkingSpaceService: ParkingSpaceService
  ) {
    super(toastr, router, authService, service, parkingService, parkingSpaceService);
  }

  protected onInit(): void {
    this.formBuild();
    this.onLoadForm(SchedulingViewDialogComponent.scheduling);
  }

  closeDialog = () => this.dialogRef.close();
}
