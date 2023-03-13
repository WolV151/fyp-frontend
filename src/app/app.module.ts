import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Angular-material imports
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
import { DeviceScreenComponent } from './components/pages/devices/device-screen/device-screen.component'


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
