import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { PhonePipe } from '../../commons/pipes/phonePipe';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { ParkingComponent } from '../../parking/parking.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { TabContentComponent } from '../../components/tab/tab-content/tab-content.component';
import { TabHeaderComponent } from '../../components/tab/tab-header/tab-header.component';
import { TabHeaderItemComponent } from '../../components/tab/tab-header-item/tab-header-item.component';
import { TabComponent } from '../../components/tab/tab.component';
import { TabContentItemComponent } from '../../components/tab/tab-content-item/tab-content-item.component';
import { AuthComponent } from '../../auth/auth.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    MapsComponent,
    ParkingComponent,
    TabComponent,
    TabContentComponent,
    TabHeaderComponent,
    TabHeaderItemComponent,
    TabContentItemComponent,
    PhonePipe,
    EmployeeComponent,
    AuthComponent
  ]
})

export class AdminLayoutModule { }
