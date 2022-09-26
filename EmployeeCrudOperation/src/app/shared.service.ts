import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeComponent } from './employee/employee.component';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44321/api";
 
  constructor(private http:HttpClient) {}

  getEmpList():Observable<any[]>{
    console.log(9999);
    return this.http.get<any>(this.APIUrl+'/Employees');
  }
  
  addEmployee(val:any){
    return this.http.post<any>(this.APIUrl+'/Employees',val);
  }

  updateEmployee(id:any,val:any)
  {
    return this.http.put<any>(this.APIUrl+'/Employees/'+id,val);
  }

  deleteEmployee(id:any)
  {
    return this.http.delete<any>(this.APIUrl+'/Employees/'+id);
  }

}
