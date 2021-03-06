import { Component } from '@angular/core';
import { ParkingComponent } from '../parking.component';
import { ToastrService } from 'ngx-toastr';
import { ParkingService } from 'app/services/parking.service';
import { AuthService } from 'app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent extends ParkingComponent {

  constructor(
    public toastr: ToastrService,
    public service: ParkingService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(toastr, router, authService, service, route);
  }

  onInit(): void {
    this.onLoadList();
  }

  onEdit(parking) {
    this.redirectFor('/parking/edit', { id: parking.id });
  }

  onRemove(parking) {
    this.onConfirmMessage()
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.service.delete(parking.id)
            .then(result => {
              this.onLoadList();
              this.onStopLoading();
              this.onSuccessMessage('Deleted!', result);
            });
        }
      });
  }
}
