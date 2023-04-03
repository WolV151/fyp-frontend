import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/components/services/device.service';
import { IDevice } from 'src/interface/IDevice';


@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit{
  private deviceId: string = this.route.snapshot.paramMap.get('id') as string;
  public deviceDetails!: IDevice;

  constructor(private route: ActivatedRoute, private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.deviceService.getDeviceDetails(this.deviceId).subscribe((dev:IDevice) => {
      this.deviceDetails = dev;
    });
  }
}
