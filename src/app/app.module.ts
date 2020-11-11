import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

// - Pipes
import { PhonePipe } from './commons/pipes/phonePipe';
import { TimePipe } from './commons/pipes/timePipe';
import { MegabytePipe } from './commons/pipes/megabytePipe';

// - Routes
import { AppRoutingModule } from './app.routing';

// - Components
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeProfileComponent } from './components/employee/employee-profile/employee-profile.component';
import { MapsComponent } from './components/maps/maps.component';
import { ParkingComponent } from './components/parking/parking.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { TabContentComponent } from './shared/tab/tab-content/tab-content.component';
import { TabHeaderComponent } from './shared/tab/tab-header/tab-header.component';
import { TabHeaderItemComponent } from './shared/tab/tab-header-item/tab-header-item.component';
import { TabComponent } from './shared/tab/tab.component';
import { TabContentItemComponent } from './shared/tab/tab-content-item/tab-content-item.component';
import { AccountRecoveryComponent } from './components/auth/account-recovery/account-recovery.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { ParkingFormComponent } from './components/parking/parking-form/parking-form.component';
import { ParkingListComponent } from './components/parking/parking-list/parking-list.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { UploadComponent } from './shared/upload/upload.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CompanyComponent } from './components/company/company.component';
import { ParkingSpaceComponent } from './components/parking-space/parking-space.component';
import { ParkingSpaceFormComponent } from './components/parking-space/parking-space-form/parking-space-form.component';
import { ParkingSpaceListComponent } from './components/parking-space/parking-space-list/parking-space-list.component';

import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { SchedulingListComponent } from './components/scheduling/scheduling-list/scheduling-list.component';
import { SchedulingViewDialogComponent } from './components/scheduling/scheduling-view-dialog/scheduling-view-dialog.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsListComponent } from './components/settings/settings-list/settings-list.component';
import { ParkingProductComponent } from './components/parking-product/parking-product.component';
import { ParkingProductListComponent } from './components/parking-product/parking-product-list/parking-product-list.component';
import { ParkingProductFormComponent } from './components/parking-product/parking-product-form/parking-product-form.component';
import { SchedulingProductComponent } from './components/scheduling-product/scheduling-product.component';
import { SchedulingProductListComponent } from './components/scheduling-product/scheduling-product-list/scheduling-product-list.component';
import { SchedulingProductViewDialogComponent } from './components/scheduling-product/scheduling-product-view-dialog/scheduling-product-view-dialog.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MaterialFileInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrGTfBFa0mZ9303uZOuvW-xYxHXtHRs2k'
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeProfileComponent,
    MapsComponent,
    ParkingComponent,
    EmployeeComponent,
    TabContentComponent,
    TabHeaderComponent,
    TabHeaderItemComponent,
    TabComponent,
    TabContentItemComponent,
    PhonePipe,
    TimePipe,
    MegabytePipe,
    AccountRecoveryComponent,
    SigninComponent,
    SignupComponent,
    ErrorComponent,
    ParkingFormComponent,
    ParkingListComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    UploadComponent,
    CompanyComponent,
    ParkingSpaceComponent,
    ParkingSpaceFormComponent,
    ParkingSpaceListComponent,
    SchedulingComponent,
    SchedulingListComponent,
    SchedulingViewDialogComponent,
    SettingsComponent,
    SettingsListComponent,
    ParkingProductComponent,
    ParkingProductListComponent,
    ParkingProductFormComponent,
    SchedulingProductComponent,
    SchedulingProductListComponent,
    SchedulingProductViewDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
