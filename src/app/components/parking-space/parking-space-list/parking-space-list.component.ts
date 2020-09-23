import { Component } from '@angular/core';
import { ParkingSpaceComponent } from '../parking-space.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import { ParkingService } from 'app/services/parking.service';

@Component({
  selector: 'app-parking-space-list',
  templateUrl: './parking-space-list.component.html',
  styleUrls: ['./parking-space-list.component.css']
})
export class ParkingSpaceListComponent extends ParkingSpaceComponent {

  constructor(
    public toastr: ToastrService,
    public service: ParkingSpaceService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService, service, parkingService);
  }

  onChange(parkingId) {
    this.onLoadList(parkingId);
  }

}