import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulingService } from 'app/services/scheduling.service';
import Scheduling from 'app/models/scheduling.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent extends BaseComponent {

  schedulings: any[];
  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: SchedulingService
  ) {
    super(toastr, router, authService);
  }

  protected onInit(): void { }
  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onLoadList() {
    this.service.toList()
      .then((result: Scheduling[]) => {
        this.schedulings = result;
        this.displayedColumns = ['id', 'userName', 'vehiclePlate', 'date', 'avaliableTime', 'unavailableTime', 'actions'];
        this.dataSource = new MatTableDataSource(this.schedulings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
