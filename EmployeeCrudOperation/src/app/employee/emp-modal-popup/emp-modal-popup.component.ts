import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-emp-modal-popup',
  templateUrl: './emp-modal-popup.component.html',
  styleUrls: ['./emp-modal-popup.component.css']
})

export class EmpModalPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private service:SharedService,private toastr:ToastrService,private dialogRef:MatDialogRef<EmpModalPopupComponent>) { }
  result:any;

  ngOnInit(): void {
    this.result=this.data;
  }

  deleteEmployeeDetails(emp_id){
      this.service.deleteEmployee(emp_id).subscribe(data=>{
        this.toastr.success('Deleted successfully','Employee details removed');
        this.dialogRef.close();
      }
      )
    }
}
