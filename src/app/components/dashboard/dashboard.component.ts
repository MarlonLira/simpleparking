import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { ParkingSpaceService } from 'app/services/parking-space.service';
import { ParkingService } from 'app/services/parking.service';
import { SchedulingService } from 'app/services/scheduling.service';
import Scheduling from 'app/models/scheduling.model';
import ParkingScore from 'app/models/parking-score.model';
import { ParkingScoreService } from 'app/services/parking-score.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent {
  public totalRevenue = 0;
  public totalAttendanceScore = 0;
  public totalLocationScore = 0;
  public totalSecurityScore = 0;


  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    public parkingSpaceService: ParkingSpaceService,
    public parkingScoreService: ParkingScoreService,
    public parkingService: ParkingService,
    public schedulingService: SchedulingService
  ) {
    super(toastr, router, authService);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  onInit() {

    this.schedulingService.getByParkingId(11)
      .then((result: Scheduling[]) => {
        if (result) {
          result.forEach((item: Scheduling) => {
            this.totalRevenue += item.value;
          });
        }
      });

    this.parkingScoreService.toList()
      .then((result: ParkingScore[]) => {
        if (result) {
          result.forEach((item: ParkingScore) => {
            this.totalAttendanceScore += item.attendanceScore / result.length;
            this.totalLocationScore += item.locationScore / result.length;
            this.totalSecurityScore += item.securityScore / result.length;
          });
        }
      });

    this.parkingScoreService.toList()
      .then((result: ParkingScore[]) => {
        if (result) {
          result.forEach((item: ParkingScore) => {
            this.totalAttendanceScore += item.attendanceScore / result.length;
            this.totalLocationScore += item.locationScore / result.length;
            this.totalSecurityScore += item.securityScore / result.length;
          });
        }
      });
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

  protected onAfterViewInit(): void {
  }
  protected onDestroy(): void {
  }
}
