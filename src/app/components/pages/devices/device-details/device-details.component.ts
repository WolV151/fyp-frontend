import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScaleType } from '@swimlane/ngx-charts';
import { DeviceService } from 'src/app/components/services/device.service';
import { TelemetryService } from 'src/app/components/services/telemetry.service';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { IDateConsumptionSeries } from 'src/interface/IDateConsumptionSeries';
import { IDevice } from 'src/interface/IDevice';


@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  private deviceId: string = this.route.snapshot.paramMap.get('id') as string;
  public deviceDetails!: IDevice;
  public cardInformation: IConsumptionSeries[] = [];
  public view: [number, number] = [875, 300];
  public cardColor: string = '#E28686';

  public colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private route: ActivatedRoute, private deviceService: DeviceService, private telemetryService: TelemetryService) { }

  ngOnInit(): void {
    const dateMessages: IDateConsumptionSeries[] = [];
    // get details
    this.deviceService.getDeviceDetails(this.deviceId).subscribe((dev: IDevice) => {
      this.deviceDetails = dev;

      // get telemetry
      this.telemetryService.getDeviceConsumption(this.deviceDetails.plug_id).subscribe((messages) => {
        messages.forEach(elem => {
          const convertedMessage: IDateConsumptionSeries = {
            name: new Date(elem.name),
            value: elem.value
          }
          dateMessages.push(convertedMessage);
        })
        const averageTime: [IConsumptionSeries, IConsumptionSeries, IConsumptionSeries] = this.findAverageWorkTime(dateMessages);
        this.cardInformation.push(averageTime[0]);
        this.cardInformation.push(averageTime[1]);
        this.cardInformation.push(averageTime[2]);
        this.telemetryService.returnElectricalProperties(this.deviceDetails.plug_id).subscribe((messages)=> {
          messages.forEach(e => {
            this.cardInformation.push(e);
          })
          this.cardInformation = [...this.cardInformation];
          console.log(this.cardInformation)
        })
      })
    });



  }

  private findAverageWorkTime = (collection: IDateConsumptionSeries[]): [IConsumptionSeries, IConsumptionSeries, IConsumptionSeries] => {
    let currentUsageStartDate: Date = new Date(collection[0].name); // initial start date
    let currentUsageEndDate: any = undefined;
    let totalWorkTime: number = 0;
    let usages: number = 0;
    for (let i = 0; i <= collection.length; i++) {
      try {
        const current = collection[i].name;
        const next = collection[i + 1].name;
        const dif = (next.getTime() - current.getTime()) / 1000;

        if (dif > 20 || i == collection.length - 2) { // one usage
          currentUsageEndDate = new Date(collection[i - 1].name);
          const hourDiff = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
          currentUsageStartDate = new Date(collection[i + 1].name);
          totalWorkTime += hourDiff;
          usages += 1;
        }

      } catch (e: unknown) {

      }
    }
    if (currentUsageEndDate === undefined) {
      currentUsageEndDate = new Date(collection[collection.length - 1].name);
      const hourDiff: number = Math.abs(((currentUsageEndDate.getTime() - currentUsageStartDate.getTime())) / 36e5);
      totalWorkTime = hourDiff;
      usages = 1;
    }

    const averageTime: IConsumptionSeries = {
      name: "Average One Usage Time (Hrs)",
      value: totalWorkTime / usages
    }

    const averagePowerConsumption: IConsumptionSeries = {
      name: "Avg KW/H For One Usage",
      value: (collection[0].value * (totalWorkTime / usages)) / 1000
    }

    const consumptionForOneHour: IConsumptionSeries = {
      name: "kWh For Three Hours",
      value: (collection[0].value * 3) / 1000
    }

    return [averageTime, averagePowerConsumption, consumptionForOneHour];
  }

}
