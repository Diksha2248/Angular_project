import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeesList:any=[];
  constructor(private service:SharedService) {
    // refreshEmpList(){
      this.service.getEmpList().subscribe(data=>{
        this.EmployeesList=data;
        console.log(data);
      })
    // }
  }

  displayedColumns: string[] = ['emp_id', 'name', 'role', 'salary','city'];
 
  ngOnInit(): void {
    // this.refreshEmpList();
    console.log(this.EmployeesList);
  }
}
