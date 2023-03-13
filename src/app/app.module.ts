import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Angular-material imports
import { MatCardModule } from '@angular/material/card'


// Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphPanelComponent } from './components/graph-panel/graph-panel.component';
import { ConsumptionLineChartComponent } from './components/consumption-line-chart/consumption-line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsumptionBarChartComponent } from './components/consumption-bar-chart/consumption-bar-chart.component';
import { ConsumptionTotalLineChartComponent } from './components/consumption-total-line-chart/consumption-total-line-chart.component';
import { UtilizationLineGaugeComponent } from './components/utilization-line-gauge/utilization-line-gauge.component'

@NgModule({
  declarations: [
    AppComponent,
    GraphPanelComponent,
    ConsumptionLineChartComponent,
    ConsumptionBarChartComponent,
    ConsumptionTotalLineChartComponent,
    UtilizationLineGaugeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
