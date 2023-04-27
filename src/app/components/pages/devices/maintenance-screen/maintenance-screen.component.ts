import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceService } from 'src/app/components/services/maintenance.service';
import { IMaintenance } from 'src/interface/IMaintenaceDetails';
import { INewMaintenance } from 'src/interface/INewMaintenance';

@Component({
  selector: 'app-maintenance-screen',
  templateUrl: './maintenance-screen.component.html',
  styleUrls: ['./maintenance-screen.component.css']
})
export class MaintenanceScreenComponent implements OnInit{
  private deviceId: string = this.route.snapshot.paramMap.get('id') as string;
  public maintenanceList:MatTableDataSource<IMaintenance> = new MatTableDataSource<IMaintenance>;
  // public displayedColumns: string[] = ['_id', 'device_name', 'details', 'edit', 'maintenance_history']
  public displayedColumns: string[] = ['select', 'position', 'name', 'weight']
  public selection: SelectionModel<IMaintenance> = new SelectionModel<IMaintenance>(true, []);
  public selectedRows: IMaintenance[] = [];
  public selectedId: string = "";
  
  public isEdit:boolean = false;

  public formDate: string = "";
  public formDetails: string = "";

  
  constructor(private route: ActivatedRoute, private maintenanceService: MaintenanceService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.maintenanceService.getMaintenanceById(this.deviceId).subscribe((maintenanceDocuments) => {
      this.maintenanceList.data = maintenanceDocuments;
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.maintenanceList.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.maintenanceList.data);
  }

  open = (content: TemplateRef<any>, params?: any) => {
    this.formDate = "";
    this.formDetails = "";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then(
      (result) => {
        this.isEdit = false;
        console.log(`Closed with: ${result}`);
      });
  }

  checkboxLabel(row?: IMaintenance): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  public handleNewMaintenance = () => {
    const newMaintenance: INewMaintenance = {
      date: new Date(this.formDate),
      details: this.formDetails,
      device_id: this.deviceId,
    }

    this.maintenanceService.addMaintenance(newMaintenance).subscribe((maint:IMaintenance) => {
      this.maintenanceList.data.push(maint);
      this.maintenanceList = new MatTableDataSource(this.maintenanceList.data);
    })
  }

  public handleDeleteRows = () => {
    this.maintenanceList.data.forEach((maint: IMaintenance) => {
      if (this.selection.isSelected(maint)) {
        this.selectedRows.push(maint)
      }
    })
    this.maintenanceService.deleteMaintenance(this.selectedRows).subscribe(() => {
      this.selectedRows.forEach(elem => {
        this.maintenanceList.data.splice(this.maintenanceList.data.indexOf(elem), 1);
      })

      this.selectedRows = [];
      this.maintenanceList = new MatTableDataSource(this.maintenanceList.data);
      this.selection.clear();
    });



  }

}
