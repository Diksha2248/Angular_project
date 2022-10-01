import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { EmpModalPopupComponent } from '../emp-modal-popup/emp-modal-popup.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit,AfterViewInit {

  EmployeesList:any=[];
  constructor(public service:SharedService,public dialog:MatDialog,private toastr:ToastrService) {
    
      // this.service.getEmpList().subscribe(data=>{
      //  this.EmployeesList=new MatTableDataSource(data); 
      //  this.EmployeesList.paginator = this.paginator;
      //   console.log(data);
      // })
  }

  displayedColumns: string[] = ['emp_id', 'name', 'role', 'salary','city','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  
  //var of add-edit emp 
 
  ngOnInit(): void {
      this.refreshList();
  }
  ngAfterViewInit() {
    this.EmployeesList.paginator = this.paginator;
    this.EmployeesList.sort=this.sort;
  }

  openAddEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EmpModalPopupComponent, {
      disableClose: true,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        active:true,
        title:"Add Employee Details",
        btn:"Add",
        tblData:this.EmployeesList
      }
    }).afterClosed().subscribe(val=>{
      this.refreshList()
    })
  }

  openEditEmpDialog(enterAnimationDuration: string, exitAnimationDuration: string,dataItem:any): void {
    this.dialog.open(EmpModalPopupComponent, {
      disableClose: true,
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:"Edit Employee Details",
        btn:"Edit",
        dataItem
      }
    }).afterClosed().subscribe(val=>{
      this.refreshList()
      console.log("refreshList")
    })
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string,dataItem:any): void {
    this.dialog.open(EmpModalPopupComponent,{
      disableClose: true,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title:"Delete Details",
        showDeletePoppup:true,
        dataItem
      }
    }).afterClosed().subscribe(val=>{
      dataItem=val;
      this.refreshList()
      console.log("refreshList")
    })
  }

  // deleteEmployeeDetails(dataItem:any){
  //   if(confirm('Are you sure?'))
  //   {
  //     this.service.deleteEmployee(dataItem.emp_id).subscribe(data=>{
  //       this.toastr.success('Deleted successfully','Employee details removed');
  //       this.refreshList();
  //     }
  //     )
  //   }
  // }

  // get employee list method
  refreshList(){
    this.service.getEmpList().subscribe({
      next:(data)=>{
        this.EmployeesList=new MatTableDataSource(data);
        this.EmployeesList.paginator = this.paginator;
        this.EmployeesList.sort=this.sort;
      },
      error:(err)=>{
        this.toastr.error('Error while fetching records');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.EmployeesList.filter = filterValue.trim().toLowerCase();

    if (this.EmployeesList.paginator) {
      this.EmployeesList.paginator.firstPage();
    }
  }
  
}
