import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ISeriesData } from 'src/interface/ISeriesData';
import { TelemetryService } from '../services/telemetry.service';

@Component({
  selector: 'app-consumption-line-chart',
  templateUrl: './consumption-line-chart.component.html',
  styleUrls: ['./consumption-line-chart.component.css']
})
export class ConsumptionLineChartComponent implements OnInit{
  public telemetryList: IConsumptionSeries[] = [];
  public hardCodedIdDummy:string = "MK117-1b6c";
  public metrics: ISeriesData[] = []
  public view:[number, number] = [1000,300]

  //opts
  public legend:boolean = true;
  public showLabels:boolean = true;
  public animations:boolean = true;
  public xAxis:boolean = true;
  public yAxis:boolean = true;
  public showYAxisLabel:boolean = true;
  public showXAxisLabel:boolean = true;
  public xAxisLabel:string = "Time and Date";
  public yAxisLabel:string = "Consumption";
  public timeline:boolean = true;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };


  constructor(private telemetryService: TelemetryService) { 
    
  }

  ngOnInit(): void {
    this.telemetryService.getDeviceConsumption(this.hardCodedIdDummy, "2023-03-03T13:00:00Z", "2023-03-03T15:30:00Z").subscribe((messages) => {
      this.telemetryList = messages;

      const singleData: ISeriesData = {
        name: this.hardCodedIdDummy,
        series: this.telemetryList
      }
      let collection: ISeriesData[] = []

      collection.push(singleData);

      this.metrics = collection;
    });
  }
}
