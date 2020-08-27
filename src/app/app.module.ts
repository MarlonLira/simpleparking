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
import { DataTablesModule } from 'angular-datatables';
import { MatTableModule } from '@angular/material/table';

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
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
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
import { DialogComponent } from './shared/upload/dialog/dialog.component';
import { UploadComponent } from './shared/upload/upload.component';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CompanyComponent } from './components/company/company.component';

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
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrGTfBFa0mZ9303uZOuvW-xYxHXtHRs2k'
    }),
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
    DialogComponent,
    UploadComponent,
    DataTableComponent,
    CompanyComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
