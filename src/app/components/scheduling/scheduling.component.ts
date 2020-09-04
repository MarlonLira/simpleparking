import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulingService } from 'app/services/scheduling.service';
import Scheduling from 'app/models/scheduling.model';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import ParkingSpace from 'app/models/parking-space.model';
import { ParkingService } from 'app/services/parking.service';
import Parking from 'app/models/parking.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends BaseComponent {

  public schedulings: any[];
  public parkings: Parking[];
  public vacancies = 0;
  public occupiedVacancies = 0;

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: SchedulingService,
    public parkingService: ParkingService,
    public parkingSpaceService: ParkingSpaceService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void {
    this.parkingService.toList()
      .then((result: Parking[]) => {
        this.parkings = result;
      });
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList(parkingId: number) {
    this.service.getByParkingId(parkingId)
      .then((schedulings: Scheduling[]) => {
        this.schedulings = schedulings;
        this.displayedColumns = ['id', 'userName', 'vehiclePlate', 'date', 'avaliableTime', 'unavailableTime', 'actions'];
        this.dataSource = new MatTableDataSource(this.schedulings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.parkingSpaceService.getByParkingId(parkingId)
          .then((parkingSpaces: ParkingSpace[]) => {
            let _vacancies = 0;
            parkingSpaces.forEach((item: ParkingSpace) => {
              _vacancies += item.amount;
            });
            this.vacancies = _vacancies;
            this.occupiedVacancies = schedulings.length;
          });
      });
  }
}
