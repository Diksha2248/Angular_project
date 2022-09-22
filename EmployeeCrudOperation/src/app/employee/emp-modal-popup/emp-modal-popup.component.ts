import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-modal-popup',
  templateUrl: './emp-modal-popup.component.html',
  styleUrls: ['./emp-modal-popup.component.css']
})

export class EmpModalPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  result:any;

  ngOnInit(): void {
    this.result=this.data;
  }

}
