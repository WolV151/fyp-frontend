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

  constructor(private telemetryService: TelemetryService) {

  }



  ngOnInit(): void {
    Chart.register(...registerables);
    Chart.register(dragPlugin);

    this.telemetryService.getTotalPowerConsumptionInRange("2023-04-01T00:00:00Z", "2023-04-15T23:59:00Z").subscribe((messages) => {
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

      console.log(convertedDateSeries);





    })




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

            if (lastValX === 0)
              lastValX = chart.data.datasets[datasetIndex].data[index].x


            if (index === 0) {

              const diff: number = chart.data.datasets[datasetIndex].data[index].x - lastValX; // x-axis movement
              chart.data.datasets[datasetIndex].data[index + 2].x += diff;
              chart.data.datasets[datasetIndex].data[index + 1].x += diff;

              chart.data.datasets[datasetIndex].data[index].y -= chart.data.datasets[datasetIndex].data[index].y // disable y movement


              lastValX = chart.data.datasets[datasetIndex].data[index].x



              // not really sure if other cases are feasable to implement
              // if the last point is clicked, only update the point before
            } else if (index === (chart.data.datasets[datasetIndex].data.length - 1)) {
              // chart.data.datasets[datasetIndex].data[index - 1] = value
            } else {
              // all other cases
              // chart.data.datasets[datasetIndex].data[index - 1] = value
              // chart.data.datasets[datasetIndex].data[index + 1] = value
            }
          },
          onDragEnd: function (e: any, datasetIndex: any, index: any, value: any) {
            e.target.style.cursor = 'default'
          },
        },
      },
      scales: {
        x: {
          type: 'linear',
          min: 1617253000000,
          max: 1617260800000,
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
            tension: 0.4,
            borderWidth: 1,
            pointHitRadius: 25
          },

        ]
      },
      options: options
    });
    this.chart = chart
  }
}