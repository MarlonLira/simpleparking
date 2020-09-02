import { Component } from '@angular/core';
import { ParkingSpaceComponent } from '../parking-space.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parking-space-list',
  templateUrl: './parking-space-list.component.html',
  styleUrls: ['./parking-space-list.component.css']
})
export class ParkingSpaceListComponent extends ParkingSpaceComponent {

  constructor(
    public toastr: ToastrService,
    public service: ParkingService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    super(toastr, router, authService, service);
  }

}
