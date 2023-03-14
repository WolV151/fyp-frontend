import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { Observable } from 'rxjs';
import { ISeriesData } from 'src/interface/ISeriesData';
import { IDevice } from 'src/interface/IDevice';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  private apiUrl: string = `http://127.0.0.1:3000/device`;

  constructor(private httpClient:HttpClient) {}

  public getAllDevices = ():Observable<IDevice[]> =>  {
    return this.httpClient.get<IDevice[]>(
      this.apiUrl, headerOptions
    );
  }
}
