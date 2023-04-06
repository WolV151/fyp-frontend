import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private apiUrl: string = `http://127.0.0.1:3000/command`;

  constructor(private httpClient:HttpClient) { }

  public switchStatus = (plugId: string, status: string) => {
    return this.httpClient.get(this.apiUrl + "/switch" + "/" + plugId + "/" + status, headerOptions);
  }

  public setIntervalSwitch = (plugId: string, hours: number, minutes: number) => {
    return this.httpClient.get(this.apiUrl + "/cdSwitch" + "/" + plugId + "/" + hours + "/" + minutes, headerOptions);
  }

  public setReportInterval = (plugId: string, delay: number) => {
    return this.httpClient.get(this.apiUrl + "/repInterval" + "/" + plugId + "/" + delay);
  }

}
