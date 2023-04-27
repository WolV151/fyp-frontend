import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { ITelemetryMessage } from 'src/interface/ITelemetryMessage';
import { TelemetryService } from '../../../services/telemetry.service';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.css'],
})
export class GraphPanelComponent implements OnInit, OnChanges {
  @Input() startDate!: string;
  @Input() endDate!: string;
  
  constructor(private telemetryService: TelemetryService ){}
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
    console.log(this.startDate);
  }

  ngOnInit(): void {
    
  }
}
