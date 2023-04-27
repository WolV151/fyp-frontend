import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { TelemetryService } from 'src/app/components/services/telemetry.service';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { IDateConsumptionSeries } from 'src/interface/IDateConsumptionSeries';
import { IDateDataSeries } from 'src/interface/IDateDataSeries';

@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.css']
})
export class WorkingTimeComponent implements OnInit, OnChanges {
  @Input() startDate!: string;
  @Input() endDate!: string;

  public timeDisplayData: IConsumptionSeries[] = [];
  public timeHolder: Record<string, number> = {};

  view: [number, number] = [875, 300];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  public xAxisLabel: string = "Device";
  public yAxisLabel: string = "Working Time (Hrs)";

  // colorScheme = {
  //   name: 'myScheme',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#f00', '#0f0', '#0ff'],
  // };

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  constructor(private telemetryService: TelemetryService) {

  }

  ngOnInit(): void {
    this.telemetryService.getTotalPowerConsumptionInRange(this.startDate, this.endDate).subscribe(messages => {
      const convertedDateSeries: IDateDataSeries[] = []; // this paid off... although perhaps it would be better if the back end did this
      messages.forEach(e => {
        const tempSerieHolder: IDateConsumptionSeries[] = [];
        e.series.forEach(serie => {
          const newData: IDateConsumptionSeries = {
            name: new Date(serie.name),
            value: serie.value
          }
          tempSerieHolder.push(newData);
        })

        const tempDateHolder: IDateDataSeries = {
          name: e.name,
          series: tempSerieHolder
        }
        convertedDateSeries.push(tempDateHolder);
      })

      const telemetryList: IDateDataSeries[] = convertedDateSeries;
      // console.log(convertedDateSeries);

      telemetryList.forEach(device => {
        let currentUsageStartDate: Date = new Date(device.series[0].name); // initial start date
        let currentUsageEndDate: any = undefined;
        for (let i = 0; i <= device.series.length; i++) {
          try {
            const current = device.series[i].name;
            const next = device.series[i + 1].name;
            const dif = (next.getTime() - current.getTime()) / 1000;

            if (dif > 20 || i == device.series.length - 2) { // one usage
              currentUsageEndDate = new Date(device.series[i-1].name);
              const hourDiff = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
              currentUsageStartDate = new Date(device.series[i+1].name);

              if (!this.timeHolder[device.name])
                this.timeHolder[device.name] = hourDiff
              else
                this.timeHolder[device.name] += hourDiff;

            }

          } catch (e: unknown) {

          }
        }
        if (currentUsageEndDate === undefined) {
          currentUsageEndDate = new Date(device.series[device.series.length - 1].name);
          const hourDiff: number = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
          this.timeHolder[device.name] = hourDiff;
        }
      });

      for (const key in this.timeHolder) {
        const time: IConsumptionSeries = {
          name: key,
          value: this.timeHolder[key]
        }
        this.timeDisplayData.push(time);
      }
      this.timeDisplayData = [...this.timeDisplayData];
      // console.log(this.timeDisplayData);
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.timeDisplayData = [];
    this.timeHolder = {};
    this.ngOnInit();
  }

}
