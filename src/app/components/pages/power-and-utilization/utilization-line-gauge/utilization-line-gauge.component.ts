import { Component, OnInit, Input } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-utilization-line-gauge',
  templateUrl: './utilization-line-gauge.component.html',
  styleUrls: ['./utilization-line-gauge.component.css']
})
export class UtilizationLineGaugeComponent implements OnInit {
  @Input() startTime!: string;
  @Input() endTime!: string;
  @Input() startDate!: string;
  @Input() endDate!: string;

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };

  public view:[number, number] = [875, 300];
  public value: number = 0;
  public previousValue: number = 100;
  public units:string = "Percentage Utilization";
  public hardCodedIdDummy:string = "MK117-1b6c";

  constructor(private telemetryService: TelemetryService) {}
  
  ngOnInit(): void {
    this.telemetryService.getUtilizationForDevice(this.hardCodedIdDummy, this.startDate, this.endDate).subscribe((messages) => {
      this.value = messages;
    })
  }
}
