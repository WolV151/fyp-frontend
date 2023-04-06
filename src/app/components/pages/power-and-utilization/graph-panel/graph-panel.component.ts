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
  public startTime: string = "00:00";
  public endTime: string = "23:59"

  public campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 13)),
    end: new FormControl(new Date(this.year, this.month, 16)),
  });

  public startDate = this.campaignOne.controls['start'].value?.toISOString().slice(0, 11) + this.startTime + ":00Z";
  public endDate = this.campaignOne.controls['end'].value?.toISOString().slice(0, 11) + this.endTime + ":00Z";
  
  constructor(private telemetryService: TelemetryService ){}

  ngOnInit(): void {
    
  }

  public handleSubmit = () => {
    // console.log(this.campaignOne.controls['start'].value?.toISOString().slice(0, 11))
    console.log(this.startDate)
  }
}
