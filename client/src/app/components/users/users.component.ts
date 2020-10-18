import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatSortHeader} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from '../../services/user.service';


export interface UserData {
  name: string;
  email: string;
  phone: number;
  dob: string;
  age: number;
  gender: string;
}

const USERS_DATA: UserData[] = [
  {name : '', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 0, dob : '30/05/1995', gender: 'amale'},
  {name : 'ram', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'zmale'},
  {name : 'a', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'x', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'c', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'd', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'dm', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'dSvam', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'},
  {name : 'cSh', email : 'shivamgupta30595@gmail.com', phone : 9352175232.0, age : 25, dob : '30/05/1995', gender: 'male'}
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{
  constructor(private userService: UserService) { }
  // dataSource = new MatTableDataSource<UserData>(USERS_DATA);
  dataSource ;
  displayedColumns: string[] = ['Name', 'Email', 'Number', 'Age', 'DOB', 'Gender'];
  limit = 30;
  skip = 0;
  currentPage = this.skip / 30 + 1;
  // @ViewChild(MatSort) sort: MatSort;
  // ngAfterViewInit(): any{
  //   this.dataSource.sort = this.sort;
  // }
  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe( (data) => {
          if (data) {
            console.log('user data fetched Successfully', data);
            this.dataSource = new MatTableDataSource<UserData>(data);
          }},
        (error) => {
          console.log(error);
        });
  }
  // openBarDialog() {
  //   const dialogRef = this.dialog.open(BarChartComponent, {});
  // }
  // openDialog() {
  //   const dialogRef = this.dialog.open(AddRecordComponent, {
  //     width: '300px',
  //     height: '250px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.newData = result;
  //       this.newData.Date = new Date().toISOString();
  //       this.addData(this.newData);
  //     }
  //   });
  // }
  //
  // next() {
  //   this.skip += this.limit;
  //   this.currentPage = this.skip / 30 + 1;
  //   this.fetchData(1);
  // }
  //
  // previous() {
  //   if(this.skip > 0) {
  //     this.skip -= this.limit;
  //     this.currentPage = this.skip / 30 + 1;
  //     this.fetchData(1);
  //   }
  // }

}
