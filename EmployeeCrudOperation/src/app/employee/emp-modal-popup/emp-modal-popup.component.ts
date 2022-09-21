import { Component, OnInit,Input } from '@angular/core';
import { ShowEmpComponent } from '../show-emp/show-emp.component';

@Component({
  selector: 'app-emp-modal-popup',
  templateUrl: './emp-modal-popup.component.html',
  styleUrls: ['./emp-modal-popup.component.css']
})

export class EmpModalPopupComponent implements OnInit {

  constructor() { }

  @Input() data:any;

  ngOnInit(): void {
  }

}
