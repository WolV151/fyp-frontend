import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isOpened: boolean = false;

  constructor(private router: Router){}

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
}
