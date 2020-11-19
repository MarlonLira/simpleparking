import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogViewComponent } from './upload/dialog-view/dialog-view.component';
import { ParkingsSelectComponent } from './parkings-select/parkings-select.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DialogViewComponent,
    ParkingsSelectComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
