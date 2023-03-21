import { Component, OnInit } from '@angular/core';
import { ICredentials } from 'src/interface/ICredentials';
import { AuthService } from '../../services/auth-service.service';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { IToken } from 'src/interface/IToken';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public formUserName:string = "";
  public formPassword:string = "";

  constructor(private authService: AuthService, private router: Router) {};

  ngOnInit(): void {}

  public handleLogin = ():void => {
    const credentials:ICredentials = {
      username: this.formUserName,
      password: this.formPassword
    }

    this.authService.login(credentials).subscribe((res:IToken) => {
      AuthInterceptor.accessToken = res.accessToken;
      localStorage.setItem("token", AuthInterceptor.accessToken);
      this.router.navigate(['/']);
    });
  }

}
