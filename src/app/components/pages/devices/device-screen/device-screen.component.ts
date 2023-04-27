import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandService } from 'src/app/components/services/command.service';
import { DeviceService } from 'src/app/components/services/device.service';
import { IDevice, INewDevice } from 'src/interface/IDevice';

@Component({
  selector: 'app-device-screen',
  templateUrl: './device-screen.component.html',
  styleUrls: ['./device-screen.component.css']
})
export class DeviceScreenComponent implements OnInit{
  public deviceList:MatTableDataSource<IDevice> = new MatTableDataSource<IDevice>;
  // public displayedColumns: string[] = ['_id', 'device_name', 'details', 'edit', 'maintenance_history']
  public displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'history']
  public selection: SelectionModel<IDevice> = new SelectionModel<IDevice>(true, []);
  public selectedRows: IDevice[] = [];
  public smartPlugList: string[] = [];
  public selectedId: string = "";
  
  public isEdit:boolean = false;

  public formDeviceName: string = "";
  public formDeviceDescription: string = "";
  public formPlugId: string = "";
  public formThreshold: number = 0;

  public plugDelay = 0;

  public countDownHours: number = 0;
  public countDownMinutes: number = 1;

  constructor(private deviceService: DeviceService, private commandService:CommandService, private modalService: NgbModal, private router: Router) {
    this.deviceService.getAllSmartPlugs().subscribe((plugs) => {
      this.smartPlugList = plugs;
    })
  }

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((devices) => {
      this.deviceList.data = devices;
    })
  }

  open = (content: TemplateRef<any>, params?: any) => {
    this.formDeviceName = "";
    this.formDeviceDescription = "";
    this.formPlugId = "";
    this.formThreshold = 0;
    
    if (params){
      this.isEdit = true;
      this.deviceService.getDeviceDetails(params).subscribe((dev:IDevice) => {
        this.selectedId = dev._id;
        this.formDeviceName = dev.device_name;
        this.formDeviceDescription = dev.description;
        this.formPlugId = dev.plug_id;
        this.formThreshold = dev.threshold;
      })
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then(
      (result) => {
        this.isEdit = false;
        console.log(`Closed with: ${result}`);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.deviceList.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.deviceList.data);
  }

  checkboxLabel(row?: IDevice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  public addNewDevice = () => {
    const newDevice: INewDevice = {
      device_name: this.formDeviceName,
      description: this.formDeviceDescription,
      plug_id: this.formPlugId,
      threshold: this.formThreshold
    }
    this.deviceService.addDevice(newDevice).subscribe((dev:IDevice) => {
      this.deviceList.data.push(dev);
      this.deviceList = new MatTableDataSource(this.deviceList.data);
    });
  }

  public handleCheckedItem = () => {
    this.deviceList.data.forEach((device: IDevice) => {
      if (this.selection.isSelected(device) && !this.selectedRows.includes(device))
        this.selectedRows.push(device);
      
      if (!this.selection.isSelected(device) && this.selectedRows.includes(device))
        this.selectedRows.splice(this.selectedRows.indexOf(device), 1);
    });
  }

  public handleDetailsRedirect = (device_id: string) => {
    return this.router.navigate(['devices/details', device_id]);
  }

  public handleMaintenanceRedirect = (deviceId: string) => {
    return this.router.navigate(['devices/maintenance', deviceId]);
  }

  public deleteDevices = () => {
    this.deviceService.deleteDevice(this.selectedRows).subscribe(() => {
      this.selectedRows.forEach(elem => {
        this.deviceList.data.splice(this.deviceList.data.indexOf(elem), 1);
      })
      this.selectedRows = [];
      this.deviceList = new MatTableDataSource(this.deviceList.data);
      this.selection.clear();
    })
  }

  public updateDevice = (deviceId: string) => {
    const updatedUser: INewDevice = {
      device_name: this.formDeviceName,
      description: this.formDeviceDescription,
      plug_id: this.formPlugId,
      threshold: this.formThreshold
    }

    this.deviceService.updateDevice(deviceId, updatedUser).subscribe((updatedDevice: IDevice) => {
      const index = this.deviceList.data.findIndex(x => x._id === deviceId);
      this.deviceList.data[index] = updatedDevice;
      this.deviceList = new MatTableDataSource(this.deviceList.data);
      this.isEdit = false;
    })
  }

  public switchDevicesStatus = (status:string) => {
    this.handleCheckedItem();
    this.selectedRows.forEach(device => {
      this.commandService.switchStatus(device.plug_id, status).subscribe(() => {
        // pass, probably a notification in the future
      });
    })
  }

  public switchStatusCd = () => {
    this.handleCheckedItem();
    this.selectedRows.forEach(device => {
      this.commandService.setIntervalSwitch(device.plug_id, this.countDownHours, this.countDownMinutes).subscribe(() => {
        // pass, probably a notification in the future
      })
    })
  }

  public setReportInterval = () => {
    this.handleCheckedItem();
    this.selectedRows.forEach(device => {
      this.commandService.setReportInterval(device.plug_id, this.plugDelay).subscribe(() => {
        // pass, proably a notification here in the future
      })
    })
  }

}
