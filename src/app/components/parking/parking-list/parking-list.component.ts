import { Component, OnInit } from '@angular/core';
import { ParkingComponent } from '../parking.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import Parking from 'app/models/parking.model';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent extends ParkingComponent {

  constructor(
    public toastr: ToastrService,
    public parkingService: ParkingService,
    public authService: AuthService
  ) {
    super(toastr, authService);
  }

  onInit(): void {
    this.parkingService.ToList()
      .then((result: Parking[]) => {
        this.parkings = result;
      });
  }

  onEdit(parking) {
    console.warn('edit');
    console.log(this.form);
    this.onLoadForm(parking);
    console.log(parking)
  }

  onRemove(parking) {
    console.warn('remove');
    console.log(parking)
  }
}
