import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IUser } from 'src/interface/IUser';

const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = `http://127.0.0.1:3000/user`;

  constructor(private httpClient:HttpClient) {}

  public getAllUsers = ():Observable<IUser[]> =>  {
    return this.httpClient.get<IUser[]>(
      this.apiUrl, headerOptions
    );
  }

  public addUser = (user:IUser):Observable<IUser> => {
    return this.httpClient.post<IUser>(
      this.apiUrl, user, headerOptions
    );
  }

  public deleteUser = (user:string):Observable<string> => {
    return this.httpClient.delete<string>(
      this.apiUrl + "/" + user, headerOptions
    );
  }

  public findUser = (username:string): Observable<IUser> => {
    return this.httpClient.get<IUser>(
      this.apiUrl + "/" + username, headerOptions
    );
  }

  public updateUser = (username:string, user:IUser):Observable<IUser> => {
    return this.httpClient.patch<IUser>(
      this.apiUrl + "/" + username, user, headerOptions
    );
  }
}
