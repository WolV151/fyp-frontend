import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-util-panel',
  templateUrl: './util-panel.component.html',
  styleUrls: ['./util-panel.component.css']
})
export class UtilPanelComponent implements OnInit{
  private today = new Date();
  private month = this.today.getMonth();
  private year = this.today.getFullYear();

  public startTime = "00:00";
  public endTime = "23:59"

  public campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, 1)),
    end: new FormControl(new Date(this.year, this.month, 1)),
  });

  public startDate = this.campaignOne.controls['start'].value?.toISOString().slice(0, 11) + this.startTime + ":00Z";
  public endDate = this.campaignOne.controls['end'].value?.toISOString().slice(0, 11) + this.endTime + ":00Z";

  ngOnInit(): void {
  }

  public handleSubmit = () => {
    // timezone issue, pick the day before, so 24 hours are summed to get the correct day
    // this.campaignOne.controls['start'].value?.setHours(this.campaignOne.controls['start'].value?.getHours() + 24);
    // this.campaignOne.controls['end'].value?.setHours(this.campaignOne.controls['end'].value?.getHours() + 24);

    this.startDate = this.campaignOne.controls['start'].value?.toISOString().slice(0, 11) + this.startTime + ":00Z";
    this.endDate = this.campaignOne.controls['end'].value?.toISOString().slice(0, 11) + this.endTime + ":00Z";
  }
}
