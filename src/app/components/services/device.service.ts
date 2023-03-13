import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IConsumptionSeries } from 'src/interface/IConsumptionSeries';
import { Observable } from 'rxjs';
import { ISeriesData } from 'src/interface/ISeriesData';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }
}
