import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(public service: SharedService,private toastr:ToastrService) {}
  @Input() empData: any;
  emp_id=null;
  name = ''
  role = ''
  salary='';
  city = '';

  ngOnInit(): void {
    console.log(this.empData)
    if (this.empData.title == "Edit Employee Details"){
      this.emp_id=this.empData.dataItem.emp_id;
      this.name = this.empData.dataItem.name;
      this.role = this.empData.dataItem.role;
      this.salary = this.empData.dataItem.salary;
      this.city = this.empData.dataItem.city;
    }
    this.refreshList();
  }
  onSubmit(formData: NgForm) {
    console.log(formData);
    if (this.empData.title == "Add Employee Details") {
      this.service.addEmployee(formData).subscribe(
        res => {
          this.toastr.success('Data added successfully','Employee details saved')
          this.refreshList();
        }
      )
    }
    else if (this.empData.title == "Edit Employee Details") {
      console.log(this.empData)
      var val={
        emp_id:this.emp_id,
        name:this.name ,
        role:this.role,
        salary:this.salary,
        city:this.city 
      }
      this.service.updateEmployee(this.emp_id,val).subscribe(
        res => {
          this.toastr.success('Edited successfully','Employee details updated')
          this.refreshList();
          console.log(val);
        },
        // err=>{
        //   console.log(err,"error in update")
        // }
      )
    }
    else {
      this.toastr.error('Some error occured');
    }
  }

  refreshList(){
    this.service.getEmpList().subscribe(data=>{
      this.empData.tblData=data;
    })
  }
}
