import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserDialogComponent } from 'src/app/components/dialogs/add-user-dialog/add-user-dialog.component';
import { UserService } from 'src/app/components/services/user.service';
import { IUser } from 'src/interface/IUser';
import { IUserRolesSelect } from 'src/interface/IUserRolesSelect';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css']
})
export class UserScreenComponent implements OnInit {
  public dataSource:MatTableDataSource<IUser> = new MatTableDataSource();
  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
  
  public userRoles:IUserRolesSelect[] = [
    {value:0, name:"User"},
    {value:1, name:"Admin"}
  ];

  public formUserName:string = "";
  public formPassword:string = "";
  public formRole: number = 0;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    })
    
  }

  open = (content: TemplateRef<any>) => {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      });
  }

  newUser = () => {
    const myNewUser: IUser = {
      username: this.formUserName,
      password: this.formPassword,
      role: this.formRole
    }
    
    this.userService.addUser(myNewUser).subscribe (() => {
      this.dataSource.data.push(myNewUser);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    })
  }

  deleteUser = (username:string) => {
    this.userService.deleteUser(username).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(e => e.username !== username);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    })
  }

}