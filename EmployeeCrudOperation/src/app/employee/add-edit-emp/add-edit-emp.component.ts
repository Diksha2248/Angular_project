import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(public service:SharedService) { }
  @Input() empData:any;
  ngOnInit(): void {
    console.log(this.empData)
  }

  onSubmit(formData:NgForm){
    console.log(formData);
    if(this.empData.title == "Add Employee Details")
    {
      this.service.addEmployee(formData).subscribe(
        // res=>{
        //   alert("Data added successfully")
        // },
        // err=>{
        //   console.log(err);
        // }
        res=>{
          formData.reset();
          alert("Data added successfully")
        }
      )
    }
    else if(this.empData.title == "Edit Employee Details")
    {
      this.service.updateEmployee(formData).subscribe(
        res=>{
          alert("Employee details edited successfully!");
        }
      )
    }
    else{
      alert("Some error occured");
    }

  }

}
