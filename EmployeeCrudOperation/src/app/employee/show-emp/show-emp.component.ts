import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EmpModalPopupComponent } from '../emp-modal-popup/emp-modal-popup.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeesList:any=[];
  constructor(private service:SharedService,public dialog:MatDialog) {
    // refreshEmpList(){
      this.service.getEmpList().subscribe(data=>{
        this.EmployeesList=data;
        console.log(data);
      })
    // }
  }

  displayedColumns: string[] = ['emp_id', 'name', 'role', 'salary','city','actions'];
  
  //var of add-edit emp 
  showAddEmpCard=false;
  empCardTitle='';
  // mydata="data";
  ngOnInit(): void {
    // this.refreshEmpList();
    console.log(this.EmployeesList);
  }

  addClick(){
    this.showAddEmpCard=true;
    this.empCardTitle="Add Employee Details";
  }

  editClick()
  {
    this.showAddEmpCard=true;
    this.empCardTitle="Edit Employee Details";
  }
  closeCard()
  {
    this.showAddEmpCard=false;
  }
  openAddEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EmpModalPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
