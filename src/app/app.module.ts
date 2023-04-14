import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Angular-material imports
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



// Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphPanelComponent } from './components/pages/power-and-utilization/graph-panel/graph-panel.component';
import { ConsumptionLineChartComponent } from './components/pages/power-and-utilization/consumption-line-chart/consumption-line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsumptionBarChartComponent } from './components/pages/power-and-utilization/consumption-bar-chart/consumption-bar-chart.component';
import { ConsumptionTotalLineChartComponent } from './components/pages/power-and-utilization/consumption-total-line-chart/consumption-total-line-chart.component';
import { UtilizationLineGaugeComponent } from './components/pages/power-and-utilization/utilization-line-gauge/utilization-line-gauge.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserScreenComponent } from './components/pages/users/user-screen/user-screen.component';
import { DeviceScreenComponent } from './components/pages/devices/device-screen/device-screen.component';
import { AddUserDialogComponent } from './components/dialogs/add-user-dialog/add-user-dialog.component';
import { LoginComponent } from './components/pages/login/login.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DeviceDetailsComponent } from './components/pages/devices/device-details/device-details.component';
import { UtilPanelComponent } from './components/pages/power-and-utilization/util-panel/util-panel.component';
import { WorkingTimeComponent } from './components/pages/power-and-utilization/working-time/working-time.component';
import { MaintenanceScreenComponent } from './components/pages/devices/maintenance-screen/maintenance-screen.component';
import { CostCheckPanelComponent } from './components/pages/cost-check/cost-check-panel/cost-check-panel.component';
import { CostLineChartComponent } from './components/pages/cost-check/cost-line-chart/cost-line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    GraphPanelComponent,
    ConsumptionLineChartComponent,
    ConsumptionBarChartComponent,
    ConsumptionTotalLineChartComponent,
    UtilizationLineGaugeComponent,
    SideNavContentComponent,
    ButtonComponent,
    HeaderComponent,
    UserScreenComponent,
    DeviceScreenComponent,
    AddUserDialogComponent,
    LoginComponent,
    DeviceDetailsComponent,
    UtilPanelComponent,
    WorkingTimeComponent,
    MaintenanceScreenComponent,
    CostCheckPanelComponent,
    CostLineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    NgbModule,
    FontAwesomeModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
