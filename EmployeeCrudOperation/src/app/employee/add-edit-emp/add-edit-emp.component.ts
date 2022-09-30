import { Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContentObserver } from '@angular/cdk/observers';
import { MatDialogRef } from '@angular/material/dialog';
import { EmpModalPopupComponent } from '../emp-modal-popup/emp-modal-popup.component';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(public service: SharedService, private toastr: ToastrService, private dialogRef: MatDialogRef<EmpModalPopupComponent>) { }
  @Input() empData: any;
  emp_id = null;
  name = ''
  role = ''
  salary = '';
  city = '';

  ngOnInit(): void {
    if (this.empData.title == "Edit Employee Details") {
      this.emp_id = this.empData.dataItem.emp_id;
      // this.name = this.empData.dataItem.name;
      // this.role = this.empData.dataItem.role;
      // this.salary = this.empData.dataItem.salary;
      // this.city = this.empData.dataItem.city;

      this.submitEmpDetailsForm.controls['name'].setValue(this.empData.dataItem.name);
      this.submitEmpDetailsForm.controls['role'].setValue(this.empData.dataItem.role);
      this.submitEmpDetailsForm.controls['salary'].setValue(this.empData.dataItem.salary);
      this.submitEmpDetailsForm.controls['city'].setValue(this.empData.dataItem.city);
      

    }
  }
  submitEmpDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required])
  })

  // ngAfterViewInit():void{
  //   this.service.EmployeesList.paginator = this.paginator;
  // }
  // onSubmit(formData: NgForm) {
  //   console.log(formData);
  //   if (this.empData.title == "Add Employee Details") {
  //     this.service.addEmployee(formData).subscribe(
  //       res => {
  //         this.toastr.success('Data added successfully', 'Employee details saved')
  //       }
  //     )
  //   }
  //   else if (this.empData.title == "Edit Employee Details") {
  //     console.log(this.empData)
  //     var val = {
  //       emp_id: this.emp_id,
  //       name: this.name,
  //       role: this.role,
  //       salary: this.salary,
  //       city: this.city
  //     }
  //     this.service.updateEmployee(this.emp_id, val).subscribe(
  //       res => {
  //         this.toastr.success('Edited successfully', 'Employee details updated')
  //       },
  //       // error=>{
  //       //   console.log(error,"error in update")
  //       // }
  //     )
  //   }
  //   else {
  //     this.toastr.error('Some error occured');
  //   }
  // }

  onSubmitForm(submitEmpDetailsFormData) {
    if (this.empData.title == "Add Employee Details") {
      if (this.submitEmpDetailsForm.valid) {
        this.service.addEmployee(submitEmpDetailsFormData).subscribe({
          next:(res)=>
          {
            this.toastr.success('Data added successfully', 'Employee details saved');
            this.submitEmpDetailsForm.reset();
            this.dialogRef.close();
          },
          error:(err)=>{
            this.toastr.success('Error while adding data');
          }
        }
        )
      }
    }
    else if (this.empData.title == "Edit Employee Details") {
      console.log(this.empData)
      var empUpdatedData = {
        emp_id: this.emp_id,
        name: this.submitEmpDetailsForm.value.name,
        role: this.submitEmpDetailsForm.value.role,
        salary:this.submitEmpDetailsForm.value.salary,
        city: this.submitEmpDetailsForm.value.city
      }
      this.service.updateEmployee(this.emp_id, empUpdatedData).subscribe({
        next:(res)=>{
          this.toastr.success('Edited successfully', 'Employee details updated')
        },
        error:(err)=>{
          this.toastr.error('Error while updating data')
        }
      })
    }
    else {
      this.toastr.error('Some error occured');
    }

  }

  get emp_name() {
    return this.submitEmpDetailsForm.get('name');
  }
  get emp_role() {
    return this.submitEmpDetailsForm.get('role');
  }
  get emp_salary() {
    return this.submitEmpDetailsForm.get('salary');
  }
  get emp_city() {
    return this.submitEmpDetailsForm.get('city');
  }
}
