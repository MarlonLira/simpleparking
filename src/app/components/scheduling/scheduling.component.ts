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
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends BaseComponent {

  public schedulings: Scheduling[];
  public parkings: Parking[];
  public parkingSpaces: ParkingSpace[];
  public selected;
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
    this.onLoadList();
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected async onLoadList(id: number = 0) {
    this.onStartLoading();
    this.parkings = await this.parkingService.toList();

    if (this.isValid(id) && id === 0) {
      if (this.isValid(this.auth.employee.parkingId)) {
        this.selected = this.auth.employee.parkingId;
      } else if (this.parkings.length > 0) {
        this.selected = this.parkings[0].id;
      }
      id = this.selected;
    }

    this.schedulings = await this.service.getByParkingId(id);
    this.displayedColumns = ['id', 'userName', 'vehiclePlate', 'date', 'avaliableTime', 'unavailableTime', 'actions'];
    this.dataSource = new MatTableDataSource(this.schedulings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.parkingSpaces = await this.parkingSpaceService.getByParkingId(id);
    let _vacancies = 0;

    this.parkingSpaces.forEach((item: ParkingSpace) => {
      _vacancies += item.amount;
    });

    this.vacancies = _vacancies;
    this.occupiedVacancies = this.schedulings.length;
    this.onStopLoading();
  }

  formBuild(): void {
    this.form = new FormGroup({
      id: new FormControl({ value: 0, disabled: true }),
      userName: new FormControl({ value: '', disabled: true }),
      cardNumber: new FormControl({ value: '', disabled: true }),
      vehiclePlate: new FormControl({ value: '', disabled: true }),
      vehicleType: new FormControl({ value: '', disabled: true }),
      value: new FormControl({ value: 0, disabled: true }),
      date: new FormControl({ value: undefined, disabled: true }),
      avaliableTime: new FormControl({ value: undefined, disabled: true }),
      unavailableTime: new FormControl({ value: undefined, disabled: true }),
    });
  }
}
