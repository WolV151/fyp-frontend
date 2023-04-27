import { Component, OnInit, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ISeriesData } from 'src/interface/ISeriesData';
import { TelemetryService } from '../../../services/telemetry.service';
import { IDateConsumptionSeries } from 'src/interface/IDateConsumptionSeries';
import { IDateDataSeries } from 'src/interface/IDateDataSeries';
import { tickStep } from 'd3';

@Component({
  selector: 'app-consumption-line-chart',
  templateUrl: './consumption-line-chart.component.html',
  styleUrls: ['./consumption-line-chart.component.css']
})
export class ConsumptionLineChartComponent implements OnInit, OnChanges {
  @Input() startDate!: string;
  @Input() endDate!: string;

  public telemetryList: IDateConsumptionSeries[] = [];
  public hardCodedIdDummy: string = "MK117-1b6c";
  public metrics: IDateDataSeries[] = [];
  public view: [number, number] = [875, 300]

  //opts
  public legend: boolean = true;
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = "Time and Date";
  public yAxisLabel: string = "Consumption (Watts)";
  public timeline: boolean = true;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };


  constructor(private telemetryService: TelemetryService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.telemetryList = []
    this.metrics = [];
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.telemetryService.returnAllConsumptionInRange(this.startDate, this.endDate).subscribe((collection) => {
      console.log(collection);
      const dataSeriesHolder: IDateConsumptionSeries[] = []
      for (let i = 0; i < collection.length; i++) {
        try {
          const currentSplitData: string[] = collection[i].name.split(" ");
          const nextSplitData: string[] = collection[i + 1].name.split(" ");

          const currentDevId: string = currentSplitData[0];
          const nextDevId: string = nextSplitData[0];

          const currentTimeStamp: Date = new Date(currentSplitData[1]);
          currentTimeStamp.setHours(currentTimeStamp.getHours() - 3)
          console.log(currentSplitData[1]);
          console.log(currentTimeStamp)
          const nextTimeStamp: Date = new Date(nextSplitData[1]);
          nextTimeStamp.setHours(nextTimeStamp.getHours() - 3)

          const currentValue: number = collection[i].value;
          const nextValue: number = collection[i + 1].value;

          const dif = (nextTimeStamp.getTime() - currentTimeStamp.getTime()) / 1000;

          if ((dif <= 10) && (currentDevId !== nextDevId)) {
            const dataObj: IDateConsumptionSeries = {
              name: currentTimeStamp,
              value: currentValue + nextValue
            }
            dataSeriesHolder.push(dataObj);

          } else if (dif > 20) {
            const newDate: Date = new Date(currentTimeStamp) // insert artificial data
            const newDate2: Date = new Date(nextTimeStamp);
            // console.log(newDate2)

            newDate.setSeconds(newDate.getSeconds() + 1);  // create new date with a 0 based on the end of the current
            newDate2.setSeconds(newDate2.getSeconds() - 1)  // based on the date of the next usage and insert a 0 before it
            const newZero: IDateConsumptionSeries = {
              name: newDate,
              value: 0
            }
            const newZero2: IDateConsumptionSeries = {
              name: newDate2,
              value: 0
            }
            const currentData: IDateConsumptionSeries = {
              name: currentTimeStamp,
              value: currentValue
            }

            const nextData: IDateConsumptionSeries = {
              name: nextTimeStamp,
              value: nextValue
            }

            dataSeriesHolder.push(currentData);
            dataSeriesHolder.push(newZero);
            dataSeriesHolder.push(newZero2);
            dataSeriesHolder.push(nextData);
            i += 1;
          } else {
            const currentData: IDateConsumptionSeries = {
              name: currentTimeStamp,
              value: currentValue
            }
            dataSeriesHolder.push(currentData);
          }

        } catch (e: unknown) {
          break;
        }
      }
      this.telemetryList = dataSeriesHolder;
      const completeObj: IDateDataSeries = {
        name: "Total",
        series: this.telemetryList
      }
      this.metrics.push(completeObj);
      this.metrics = [...this.metrics]; 
      // console.log(this.metrics);
    });
  }
}
