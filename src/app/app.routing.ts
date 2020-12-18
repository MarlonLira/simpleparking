import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { GroupGuard } from './group-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeProfileComponent } from './components/employee/employee-profile/employee-profile.component';
import { MapsComponent } from './components/maps/maps.component';
import { ParkingComponent } from './components/parking/parking.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AccountRecoveryComponent } from './components/auth/account-recovery/account-recovery.component';
import { ErrorComponent } from './components/error/error.component';
import { ParkingFormComponent } from './components/parking/parking-form/parking-form.component';
import { ParkingListComponent } from './components/parking/parking-list/parking-list.component';
import { CompanyComponent } from './components/company/company.component';
import { ParkingSpaceComponent } from './components/parking/parking-space/parking-space.component';
import { SchedulingListComponent } from './components/scheduling/scheduling-list/scheduling-list.component';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsListComponent } from './components/settings/settings-list/settings-list.component';
import { ParkingProductComponent } from './components/parking/parking-product/parking-product.component';
import { ParkingPriceComponent } from './components/parking/parking-price/parking-price.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee-profile', component: EmployeeProfileComponent },
  { path: 'maps', component: MapsComponent, canActivate: [GroupGuard] },
  {
    path: 'parking', component: ParkingComponent,
    children: [
      { path: 'register', component: ParkingFormComponent, canActivate: [GroupGuard] },
      { path: 'edit', component: ParkingFormComponent, canActivate: [GroupGuard] },
      { path: 'list', component: ParkingListComponent, canActivate: [GroupGuard] },
      { path: 'space', component: ParkingSpaceComponent, canActivate: [GroupGuard] },
      { path: 'product', component: ParkingProductComponent, canActivate: [GroupGuard] },
      { path: 'price', component: ParkingPriceComponent, canActivate: [GroupGuard] },
    ],
    canActivate: [GroupGuard]
  },
  {
    path: 'scheduling', component: SchedulingComponent,
    children: [
      { path: 'list', component: SchedulingListComponent, canActivate: [GroupGuard] }
    ]
  },
  {
    path: 'settings', component: SettingsComponent,
    children: [
      { path: 'list', component: SettingsListComponent, canActivate: [GroupGuard] }
    ]
  },
  {
    path: 'employee', component: EmployeeComponent,
    children: [
      { path: 'register', component: EmployeeFormComponent, canActivate: [GroupGuard] },
      { path: 'edit', component: EmployeeFormComponent, canActivate: [GroupGuard] },
      { path: 'list', component: EmployeeListComponent, canActivate: [GroupGuard] }
    ],
    canActivate: [GroupGuard]
  },
  { path: 'company', component: CompanyComponent, canActivate: [GroupGuard] },
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
      useHash: false,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
