import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaintenance } from 'src/interface/IMaintenaceDetails';
import { INewMaintenance } from 'src/interface/INewMaintenance';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl: string = `http://127.0.0.1:3000/maintain`;

  constructor(private httpClient: HttpClient) { }

  public getMaintenanceById = (deviceId: string):Observable<IMaintenance[]> => {
    return this.httpClient.get<IMaintenance[]>(this.apiUrl + "/" + deviceId, headerOptions);
  }

  public addMaintenance = (maintenance: INewMaintenance):Observable<IMaintenance> => {
    return this.httpClient.post<IMaintenance>(this.apiUrl, maintenance, headerOptions);
  }

  public deleteMaintenance = (maintenanceList: IMaintenance[]): Observable<IMaintenance[]> => {
    return this.httpClient.post<IMaintenance[]>(this.apiUrl + "/delete", maintenanceList, headerOptions); 
  }

  public editMaintenance = (maintenanceId: string, updatedMaintenance: INewMaintenance): Observable<IMaintenance> => {
    return this.httpClient.patch<IMaintenance>(this.apiUrl, updatedMaintenance, headerOptions);
  }
}
