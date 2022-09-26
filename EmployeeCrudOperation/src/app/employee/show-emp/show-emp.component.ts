import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EmpModalPopupComponent } from '../emp-modal-popup/emp-modal-popup.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeesList:any=[];
  constructor(private service:SharedService,public dialog:MatDialog,private toastr:ToastrService) {
    
      this.service.getEmpList().subscribe(data=>{
        this.EmployeesList=data;
        console.log(data);
      })
  }

  displayedColumns: string[] = ['emp_id', 'name', 'role', 'salary','city','actions'];
  
  //var of add-edit emp 
 
  ngOnInit(): void {
      this.refreshList();
  }

  openAddEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EmpModalPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        active:true,
        title:"Add Employee Details",
        btn:"Add",
        tblData:this.EmployeesList
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

  deleteEmployeeDetails(dataItem:any){
    if(confirm('Are you sure?'))
    {
      this.service.deleteEmployee(dataItem.emp_id).subscribe(data=>{
        this.toastr.success('Deleted successfully','Employee details removed');
        this.refreshList();
      }
      )
    }
  }

  refreshList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeesList=data;
    })
  }

}
