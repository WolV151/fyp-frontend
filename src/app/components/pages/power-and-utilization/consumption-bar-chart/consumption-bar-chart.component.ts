import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { TelemetryService } from '../../../services/telemetry.service';
import { ISeriesData } from 'src/interface/ISeriesData';

@Component({
  selector: 'app-consumption-bar-chart',
  templateUrl: './consumption-bar-chart.component.html',
  styleUrls: ['./consumption-bar-chart.component.css']
})
export class ConsumptionBarChartComponent implements OnInit, OnChanges {
  @Input() startDate!: string;
  @Input() endDate!: string;

  public telemetryList: ISeriesData[] = [];
  public metrics: ISeriesData[] = [];
  public totalCalculatedKWH: IConsumptionSeries[] = [];

  public hourCalculator: Record<string, number> = {};
  public averageWatts: Record<string, number> = {};

  public hardCodedIdDummy: string = "MK117-1b6c";
  public view: [number, number] = [875, 300]

  //opts
  public legend: boolean = false;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = "Device";
  public yAxisLabel: string = "Consumption (kWH)";
  public timeline: boolean = true;
  public gradient: boolean = false;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };


  constructor(private telemetryService: TelemetryService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.hourCalculator = {};
    this.averageWatts = {};
    this.ngOnInit();
  }

  // "2023-03-03T13:00:00Z", "2023-03-07T15:30:00Z"
  ngOnInit(): void {
    this.telemetryService.getTotalPowerConsumptionInRange(this.startDate, this.endDate).subscribe((messages) => {
      this.telemetryList = messages;
      this.metrics = this.telemetryList;
      const tempKwh: IConsumptionSeries[] = [];
      // split multiple usages first by adding artificial 0s
      this.metrics.forEach(device => {
        let currentUsageStartDate: Date = new Date(device.series[0].name); // initial start date
        let currentUsageEndDate: any = undefined;
        let wattSum: number = 0;
        for (let i = 0; i < device.series.length; i++) {
          try {
            wattSum += device.series[i].value;
            const current = new Date(device.series[i].name);
            const next = new Date(device.series[i + 1].name);
            const dif = (next.getTime() - current.getTime()) / 1000;

            if (!this.averageWatts[device.name])
              this.averageWatts[device.name] = device.series[i].value;
            else
              this.averageWatts[device.name] += device.series[i].value;

            if (dif > 10) { // one usage
              currentUsageEndDate = new Date(device.series[i].name);

              const hourDiff: number = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
              if (!this.hourCalculator[device.name])
                this.hourCalculator[device.name] = hourDiff;
              else
                this.hourCalculator[device.name] += hourDiff;

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
              currentUsageStartDate = new Date(device.series[i].name);
            }

          } catch (e: unknown) {
            break;
          }
        }
        this.averageWatts[device.name] = this.averageWatts[device.name] / device.series.length;


        if (currentUsageEndDate === undefined) {
          currentUsageEndDate = new Date(device.series[device.series.length - 1].name);
          const hourDiff: number = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
          this.hourCalculator[device.name] = hourDiff;
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
      
      for (const key in this.hourCalculator) {
        const kwh: IConsumptionSeries = {
          name: key,
          value: (this.averageWatts[key] * this.hourCalculator[key]) / 1000
        }

        tempKwh.push(kwh);
      }
      this.totalCalculatedKWH = tempKwh;
      console.log(this.totalCalculatedKWH);
    });
  }

}
