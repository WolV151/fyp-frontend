import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ITelemetryMessage } from 'src/interface/ITelemetryMessage';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.css'],
})
export class GraphPanelComponent implements OnInit {
  private today = new Date();
  private month = this.today.getMonth();
  private year = this.today.getFullYear();


  campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });

  constructor(private telemetryService: TelemetryService ){}

  ngOnInit(): void {}

}
