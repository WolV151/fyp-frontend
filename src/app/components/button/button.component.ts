import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit{
  @Output() clickEvent:EventEmitter<Event> = new EventEmitter;
  @Input() buttonColor!: string;
  @Input() buttonText!: string;

  constructor() {}
  
  ngOnInit(): void {}

  onClick = () => {
    this.clickEvent.emit();
  }

}
