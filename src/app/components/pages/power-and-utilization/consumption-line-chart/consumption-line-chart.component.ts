import { Component, OnInit, Input, OnChanges, SimpleChanges, Type} from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ISeriesData } from 'src/interface/ISeriesData';
import { TelemetryService } from '../../../services/telemetry.service';
import { IDateConsumptionSeries } from 'src/interface/IDateConsumptionSeries';
import { IDateDataSeries } from 'src/interface/IDateDataSeries';

@Component({
  selector: 'app-consumption-line-chart',
  templateUrl: './consumption-line-chart.component.html',
  styleUrls: ['./consumption-line-chart.component.css']
})
export class ConsumptionLineChartComponent implements OnInit, OnChanges{
  @Input() startDate!: string;
  @Input() endDate!: string;

  public telemetryList: IDateConsumptionSeries[] = [];
  public hardCodedIdDummy:string = "MK117-1b6c";
  public metrics: IDateDataSeries[] = []
  public view:[number, number] = [875,300]

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
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.telemetryService.getDeviceConsumption(this.hardCodedIdDummy, this.startDate, this.endDate).subscribe((messages) => {
      const convertedDateSeries: IDateConsumptionSeries[] = []; // this paid off... although perhaps it would be better if the back end did this
      messages.forEach(e => {
        const tempDateHolder: IDateConsumptionSeries = {
          name: new Date(e.name),
          value: e.value
        }
        convertedDateSeries.push(tempDateHolder);
      })
      this.telemetryList = convertedDateSeries;

      const singleData: IDateDataSeries = {
        name: this.hardCodedIdDummy,
        series: this.telemetryList
      }
      let collection: IDateDataSeries[] = []

      collection.push(singleData);

      this.metrics = collection;

      for (let i = 0; i < this.metrics[0].series.length; i++) {
        try{
          const current = this.metrics[0].series[i].name;
          const next = this.metrics[0].series[i+1].name;
          const dif = (next.getTime() - current.getTime()) / 1000;

          if (dif > 10) {
            const newDate: Date = this.metrics[0].series[i].name;

            for (let j=1;j<4;j++) {
              newDate.setSeconds(newDate.getSeconds() + j+j);
              const newZero: IDateConsumptionSeries = {
                name: newDate,
                value: 0
              }
              this.metrics[0].series.splice(i+1, 0, newZero);
            }
            i+=2;
          }

        } catch (e: unknown) {
          break;
        }
      }
    });
  }
}
