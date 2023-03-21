import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './components/services/auth-service.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isOpened: boolean = false;

  constructor(private router: Router, private authService: AuthService){}

  public toggleSideNav = () => {
    this.isOpened = !this.isOpened;
  }

  public redirect = (name: string) => {
    switch(name) {
      case "Power and Utilization":
        this.router.navigate(['']);
        break;
      case "Users":
        this.router.navigate(['users']);
        break;
      case "Devices":
        this.router.navigate(['devices']);
        break;
    }
  }

  public handleLogout = () => {
    this.authService.logout().subscribe(() => {
      AuthInterceptor.accessToken = '';
      this.router.navigate(['login']);
    })
  }

  public hasNotRoute = (url: string) => {
    console.log(this.router.url)
    return this.router.url !== url;
  }

}
