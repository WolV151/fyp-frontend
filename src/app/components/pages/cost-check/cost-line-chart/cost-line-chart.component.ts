import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js'
import * as dragPlugin from 'chartjs-plugin-dragdata';
import { TelemetryService } from 'src/app/components/services/telemetry.service';
import { IDateConsumptionSeries } from 'src/interface/IDateConsumptionSeries';
import { IDateDataSeries } from 'src/interface/IDateDataSeries';

export type MyChartOptions = ChartOptions & { plugins: { dragData: { round: number; dragX?: boolean; showTooltip: boolean; onDragStart: Function, onDrag: Function, onDragEnd: Function }; }; };

@Component({
  selector: 'app-cost-line-chart',
  templateUrl: './cost-line-chart.component.html',
  styleUrls: ['./cost-line-chart.component.css']
})
export class CostLineChartComponent implements OnInit {
  public chart: any;
  public telemetryList: IDateDataSeries[] = [];
  public metrics: IDateDataSeries[] = []
  public oneUsageFlag: boolean = true;


  constructor(private telemetryService: TelemetryService) {

  }



  ngOnInit(): void {
    Chart.register(...registerables);
    Chart.register(dragPlugin);

    this.telemetryService.getTotalPowerConsumptionInRange("2023-04-07T00:00:00Z", "2023-04-07T23:59:00Z").subscribe((messages) => {
        // CHART OPTIONS
        var lastValX: number = 0;


        var options: MyChartOptions = {
          plugins: {
            dragData: {
              round: 0,
              dragX: true,
              showTooltip: true,
              onDragStart: function (e: any, datasetIndex: any, index: any, value: any) {
                e.target.style.cursor = 'grabbing'
              },
              onDrag: function (e: any, datasetIndex: any, index: any, value: any) {
                chart.data.datasets[datasetIndex].data[index].y -= chart.data.datasets[datasetIndex].data[index].y // disable y movement
    
                if (lastValX === 0)
                  lastValX = chart.data.datasets[datasetIndex].data[index].x
                  const diff: number = chart.data.datasets[datasetIndex].data[index].x - lastValX; // x-axis movement

    
    
                  lastValX = chart.data.datasets[datasetIndex].data[index].x
    
    
    
                  // not really sure if other cases are feasable to implement
                

              },
              onDragEnd: function (e: any, datasetIndex: any, index: any, value: any) {
                e.target.style.cursor = 'default'
              },
            },
          },
          scales: {
            x: {
              type: 'linear',
              min: parseInt((new Date(messages[0].series[0].name).getTime() / 1000).toFixed(0)),
              max: parseInt((new Date(messages[2].series[messages[2].series.length - 1].name).getTime() / 1000).toFixed(0)),
              ticks: {
                callback(v) {
                  return new Date(v).toLocaleTimeString(navigator.language, {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }
              }
            },
            y: {
              beginAtZero: true,
              max: 100
            },
          }
        };
        // END OF CHART OPTIONS

      const chart = new Chart('chart', {
        type: "line" as ChartType,
        data: {
          labels: [],  // possibly unusable due to custom x-scale ticks
          datasets: [
            {
              label: '# of Votes',
              data: [
                {
                  x: 1617253200000,
                  y: 0
                },
                {
                  x: 1617256800000,
                  y: 90
                },
                {
                  x: 1617260400000,
                  y: 0
                }
              ],
              fill: true,
              tension: 0.0,
              borderWidth: 1,
              pointHitRadius: 25
            },
          ]
        },
        options: options
      });

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

      this.telemetryList = convertedDateSeries;
      this.metrics = this.telemetryList;

      this.metrics.forEach(device => {
        for (let i = 0; i < device.series.length; i++) {
          try {
            const current = device.series[i].name;
            const next = device.series[i + 1].name;
            const dif = (next.getTime() - current.getTime()) / 1000;

            if (dif > 20) { // one usage
              this.oneUsageFlag = false;
              const newDate: Date = new Date(device.series[i].name) // insert artificial data
              const newDate2: Date = new Date(device.series[i + 1].name);
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
              device.series.splice(i + 1, 0, newZero);
              device.series.splice(i + 2, 0, newZero2);
              i += 2;
            }
          } catch (e: unknown) {
            break;
          }
        }
        if (this.oneUsageFlag) {
          const newDate: Date = new Date(device.series[0].name)
          const newDate2: Date = new Date(device.series[device.series.length - 1].name);

          newDate.setSeconds(newDate.getSeconds() - 1);  // create new date with a 0 based on the end of the current
          newDate2.setSeconds(newDate2.getSeconds() + 1)  // based on the date of the next usage and insert a 0 before it
          const newZero: IDateConsumptionSeries = {
            name: newDate,
            value: 0
          }
          const newZero2: IDateConsumptionSeries = {
            name: newDate2,
            value: 0
          }
          device.series.splice(0, 0, newZero);
          device.series.splice(device.series.length - 1, 0, newZero2);
        }
      });

      this.metrics.forEach(elem => {
        const dataHolder: {x: number, y: number}[] = []

        const datasetDocument = {
          label: elem.name,
          data: dataHolder,
          fill: true,
          tension: 0.0,
          borderWidth: 1,
          pointHitRadius: 25
        }

        elem.series.forEach(data => {
          const dataPoint = {
            x: parseInt((new Date(data.name).getTime() / 1000).toFixed(0)),
            y: data.value / 100
          }
          datasetDocument.data.push(dataPoint);
        })
        chart.data.datasets.push(datasetDocument)
      })
      console.log(chart.data.datasets)
      chart.data.datasets.shift()
      this.chart = chart
      this.chart.update()
    })




    
    
  }
}