import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ISeriesData } from 'src/interface/ISeriesData';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-consumption-total-line-chart',
  templateUrl: './consumption-total-line-chart.component.html',
  styleUrls: ['./consumption-total-line-chart.component.css']
})
export class ConsumptionTotalLineChartComponent implements OnInit, OnChanges{
  @Input() startDate!: string;
  @Input() endDate!: string;

  public telemetryList: ISeriesData[] = [];
  public hardCodedIdDummy:string = "MK117-1b6c";
  public metrics: ISeriesData[] = []
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

  constructor(private telemetryService: TelemetryService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.telemetryService.getTotalPowerConsumptionInRange(this.startDate, this.endDate).subscribe((messages) => {
      this.telemetryList = messages;
      this.metrics = this.telemetryList;
      // split multiple usages first by adding artificial 0s
      this.metrics.forEach(device => {
        let wattSum: number = 0;
        for (let i = 0; i < device.series.length; i++) {
          try {
            wattSum += device.series[i].value;
            const current = new Date(device.series[i].name);
            const next = new Date(device.series[i + 1].name);
            const dif = (next.getTime() - current.getTime()) / 1000;

            device.series[i].name = new Date(device.series[i].name);

            if (dif > 10) { // one usage
              console.log(dif);
              const newDate: Date = new Date(device.series[i + 1].name) // insert artificial data
              for (let j = 1; j < 4; j++) {
                newDate.setSeconds(newDate.getSeconds() - j);
                const newZero: IConsumptionSeries = {
                  name: newDate.toISOString(),
                  value: 0
                }
                device.series.splice(i + 1, 0, newZero);
              }
              i += 2;
            }

          } catch (e: unknown) {
            break;
          }
        }

        
        /*
          Now let's analyse the new data. I have msgs in range (msg->msg->msg->0) this represents a single usage.
          Now, when we reach a 0 this means we reached the end of this particular usage. We should save the starting
          date initially so we have the date of the first message. Now we reached a 0 - save the previous message.
          Now we can calculate the difference in hours for this particular usage and save this to an array. Then after
          we are done with this device we can sum up all the hours and apply the KWH conversion formula - save this to a
          IConsumptionSeries where the name is the name of the value is the KWH - plot this on the bar chart.
        */
        // const hrsSum: number = tempArray.reduce((x, y) => x + y, 0);
      });
    });
  }
}
