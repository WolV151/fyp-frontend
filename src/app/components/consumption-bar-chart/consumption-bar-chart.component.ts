import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { TelemetryService } from '../services/telemetry.service';

@Component({
  selector: 'app-consumption-bar-chart',
  templateUrl: './consumption-bar-chart.component.html',
  styleUrls: ['./consumption-bar-chart.component.css']
})
export class ConsumptionBarChartComponent implements OnInit {

  public telemetryList: IConsumptionSeries[] = [];
  public metrics: IConsumptionSeries[] = [];
  public hardCodedIdDummy: string = "MK117-1b6c";
  public view: [number, number] = [700, 300]

  //opts
  public legend: boolean = false;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = "Device";
  public yAxisLabel: string = "Consumption (Watt)";
  public timeline: boolean = true;
  public gradient: boolean = false;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };


  constructor(private telemetryService: TelemetryService) { }

  ngOnInit(): void {
    this.telemetryService.getTotalConsumptionByDevice("2023-03-03T13:00:00Z", "2023-03-07T15:30:00Z").subscribe((messages) => {
      this.telemetryList = messages;
      this.metrics = this.telemetryList;
    });
  }

}
