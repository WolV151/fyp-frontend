import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = 'EMS';
  public faBars: IconDefinition = faBars;

  @Output() navBarEvent: EventEmitter<Event> = new EventEmitter;
  @Output() logOutEvent: EventEmitter<Event> = new EventEmitter;

  constructor() {}
  ngOnInit(): void {}

  navbarSignal = () => {
    this.navBarEvent.emit();
  }

  logOutSignal = () => {
    this.logOutEvent.emit();
  }
}
