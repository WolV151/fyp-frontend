import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IToken } from 'src/interface/IToken';
import { ICredentials } from 'src/interface/ICredentials';

const headerOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  })


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin: string  = `http://127.0.0.1:3000/login`;
  private apiUrlLogout: string = `http://127.0.0.1:3000/logout`
  private apiUrlRefresh: string = `http://127.0.0.1:3000/refresh`;

  public isAuthenticated: boolean = false;

  constructor(private httpClient:HttpClient) {}

  public login = (credentials: ICredentials) => {
    return this.httpClient.post<IToken>(
      this.apiUrlLogin, credentials, {headers:headerOptions, withCredentials:true}
    )
  }

  public logout = () => {
    localStorage.removeItem("token");
    return this.httpClient.get(
      this.apiUrlLogout, {withCredentials: true}
    )
  }

  public refresh = (): Observable<unknown> => {
    return this.httpClient.get<unknown>(this.apiUrlRefresh, {withCredentials:true})
  }

  public getAuthStatus = () => {
    console.log(this.isAuthenticated)
    return this.isAuthenticated;
  }
}
