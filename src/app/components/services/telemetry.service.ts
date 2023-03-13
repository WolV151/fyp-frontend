import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { Observable } from 'rxjs';
import { ISeriesData } from 'src/interface/ISeriesData';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})


export class TelemetryService {

  private apiUrl: string = `http://127.0.0.1:3000/telemetry`;
  private devConsumptPath: string = "/findDeviceConsumption";
  private totalDevConsumptionPath: string = "/biggestConsumer";
  private totalAllDevConsumptionPath:string = "/totalPower";
  private getUtilizationForDevicePath: string = "/findUtilization";


  constructor(private httpClient: HttpClient) { }

  public getDeviceConsumption = (deviceId: string, startDate:string, endDate:string): Observable<IConsumptionSeries[]> => {
    return this.httpClient.get<IConsumptionSeries[]>
    (
      this.apiUrl + this.devConsumptPath + "/" + deviceId + "/" + startDate + "/" + endDate,
      headerOptions
    );
  }

  public getTotalConsumptionByDevice = (startDate:string, endDate:string): Observable<IConsumptionSeries[]> => {
    return this.httpClient.get<IConsumptionSeries[]>
    (
      this.apiUrl + this.totalDevConsumptionPath + "/" + startDate + "/" + endDate, headerOptions
    );
  }

  public getTotalPowerConsumptionInRange = (startDate:string, endDate:string): Observable<ISeriesData[]> => {
    return this.httpClient.get<ISeriesData[]>
    (
      this.apiUrl + this.totalAllDevConsumptionPath + "/" + startDate + "/" + endDate, headerOptions
    );
  }

  public getUtilizationForDevice = (deviceId:string, startDate:string, endDate:string): Observable<number> => {
    return this.httpClient.get<number>
    (
      this.apiUrl + this.getUtilizationForDevicePath + "/" + deviceId + "/" + startDate + "/" + endDate
    )
  }


}
