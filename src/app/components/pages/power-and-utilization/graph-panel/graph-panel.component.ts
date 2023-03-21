import { Component, OnInit } from '@angular/core';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ITelemetryMessage } from 'src/interface/ITelemetryMessage';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.css'],
})
export class GraphPanelComponent implements OnInit {
  constructor(private telemetryService: TelemetryService ){}

  ngOnInit(): void {}

}
