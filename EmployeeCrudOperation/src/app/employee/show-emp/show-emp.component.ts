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
    
      this.service.getEmpList().subscribe(data=>{
        this.EmployeesList=data;
        console.log(data);
      })
  }

  displayedColumns: string[] = ['emp_id', 'name', 'role', 'salary','city','actions'];
  
  //var of add-edit emp 
 
  ngOnInit(): void {
  
    console.log(this.EmployeesList);
  }

  openAddEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EmpModalPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        active:true,
        title:"Add Employee Details",
        btn:"Add"
      }
    });
  }

  openEditEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string,dataItem:any): void {
    this.dialog.open(EmpModalPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:"Edit Employee Details",
        btn:"Edit",
        dataItem
      }
    });
  }
}
