import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/services/user.service';
import { IUser } from 'src/interface/IUser';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css']
})
export class UserScreenComponent implements OnInit{
  public userList:IUser[] = [];
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  
  constructor(private userService:UserService) {}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.userList = users;
    })
  }

}
