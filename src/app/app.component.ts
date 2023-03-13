import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isOpened: boolean = false;

  public toggleSideNav = () => {
    this.isOpened = !this.isOpened;
    console.log(this.isOpened);
  }

}
