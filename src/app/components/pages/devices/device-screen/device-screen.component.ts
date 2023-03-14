import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/components/services/device.service';
import { IDevice } from 'src/interface/IDevice';

@Component({
  selector: 'app-device-screen',
  templateUrl: './device-screen.component.html',
  styleUrls: ['./device-screen.component.css']
})
export class DeviceScreenComponent implements OnInit{
  public deviceList:IDevice[] = [];
  // public displayedColumns: string[] = ['_id', 'device_name', 'details', 'edit', 'maintenance_history']
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'history']
  
  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((devices) => {
      this.deviceList = devices;
      console.log(devices)
    })
  }

  

}
