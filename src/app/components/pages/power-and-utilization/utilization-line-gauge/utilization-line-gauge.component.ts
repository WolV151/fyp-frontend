import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-utilization-line-gauge',
  templateUrl: './utilization-line-gauge.component.html',
  styleUrls: ['./utilization-line-gauge.component.css']
})
export class UtilizationLineGaugeComponent implements OnInit {
  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  public view:[number, number] = [700, 300];
  public value: number = 0;
  public previousValue: number = 100;
  public units:string = "Percentage Utilization";
  public hardCodedIdDummy:string = "MK117-1b6c";

  constructor(private telemetryService: TelemetryService) {}
  
  ngOnInit(): void {
    this.telemetryService.getUtilizationForDevice(this.hardCodedIdDummy, "2023-03-03T13:00:00Z", "2023-03-03T15:30:00Z").subscribe((messages) => {
      this.value = messages;
    })
  }
}
