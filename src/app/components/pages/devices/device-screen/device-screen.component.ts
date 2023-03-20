import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  public formDeviceName: string = "";
  public formDeviceDescription: string = "";
  public formPlugId: string = "";
  public formThreshold: number = 0;

  constructor(private deviceService: DeviceService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.deviceService.getAllDevices().subscribe((devices) => {
      this.deviceList.data = devices;
      // console.log(this.deviceList.data)
    })


    this.deviceService.getAllSmartPlugs().subscribe((plugs) => {
      this.smartPlugList = plugs;
      console.log(this.smartPlugList);
    })
  }

  open = (content: TemplateRef<any>) => {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then(
      (result) => {
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
    const myVar: boolean = this.selection.isSelected(row);
    if (myVar) {
      if (!this.selectedRows.includes(row))
        this.selectedRows.push(row);
      
    } else {
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
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
    console.log(newDevice);
    this.deviceService.addDevice(newDevice);
  }
  

}
