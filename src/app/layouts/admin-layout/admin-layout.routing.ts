import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { ParkingComponent } from '../../parking/parking.component';
import { EmployeeComponent } from '../../employee/employee.component';
import { AuthComponent } from '../../auth/auth.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'parking', component: ParkingComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'auth', component: AuthComponent },
];
