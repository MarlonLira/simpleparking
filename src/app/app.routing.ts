import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { GroupGuard } from './group-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { MapsComponent } from './components/maps/maps.component';
import { ParkingComponent } from './components/parking/parking.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AccountRecoveryComponent } from './components/auth/account-recovery/account-recovery.component';
import { ErrorComponent } from './components/error/error.component';
import { ParkingFormComponent } from './components/parking/parking-form/parking-form.component';
import { ParkingListComponent } from './components/parking/parking-list/parking-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'maps', component: MapsComponent, canActivate: [GroupGuard] },
  {
    path: 'parking',
    component: ParkingComponent,
    children: [
      {
        path: 'register',
        component: ParkingFormComponent
      }, {
        path: 'edit',
        component: ParkingFormComponent
      },
      {
        path: 'list',
        component: ParkingListComponent
      }
    ]
  },
  { path: 'employee', component: EmployeeComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/account-recovery', component: AccountRecoveryComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
