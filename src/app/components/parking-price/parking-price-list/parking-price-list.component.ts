import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingPrice } from 'app/models/parking-price.models';
import { AuthService } from 'app/services/auth.service';
import { ParkingPriceService } from 'app/services/parking-price.service';
import { ParkingService } from 'app/services/parking.service';
import { ToastrService } from 'ngx-toastr';
import { ParkingPriceComponent } from '../parking-price.component';

@Component({
  selector: 'app-parking-price-list',
  templateUrl: './parking-price-list.component.html',
  styleUrls: ['./parking-price-list.component.css']
})
export class ParkingPriceListComponent extends ParkingPriceComponent {

  constructor(
    public toastr: ToastrService,
    public service: ParkingPriceService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    public parkingService: ParkingService
  ) {
    super(toastr, router, authService, service, parkingService);
  }

  onEdit(parkingPrice: ParkingPrice) {
    this.redirectFor('/parking-price/edit', { id: parkingPrice.id });
  }

}
