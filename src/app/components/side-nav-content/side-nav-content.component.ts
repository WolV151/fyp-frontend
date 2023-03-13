import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISideBar } from 'src/interface/ISideBar';
import { faBolt, faHouseLaptop, faUser, faChartArea} from '@fortawesome/free-solid-svg-icons';

const MENU_DATA: ISideBar[] = [
  {icon: faBolt, name: "Power and Utilization"},
  {icon: faHouseLaptop, name: "Devices"},
  {icon: faChartArea, name: "Cost Check"},
  {icon: faUser, name: "Users"}
]

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.css']
})



export class SideNavContentComponent implements OnInit{
  public dataSource: ISideBar[] = MENU_DATA;
  @Output() sideBarEvent: EventEmitter<string> = new EventEmitter

  constructor(){}
  ngOnInit(): void {}

  menuEventTrigger = (name: string) => {
    this.sideBarEvent.emit(name);
  }

}
