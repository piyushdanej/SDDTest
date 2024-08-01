import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs'
import { Employee } from 'src/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  lastIndex : number;
  employeeList : Employee[];
  url : string = 'http://localhost:3000'
  constructor(private http : HttpClient) { }

  getEmployees() : Observable<Employee[]>  {
    return this.http.get<{employees : Employee[]}>(this.url+'/getEmployees').pipe(
      map(res => res.employees),
      tap((res : Employee[]) => {
        this.employeeList = res;
        this.lastIndex = res[res.length -1].id;
      })
    );
  }

  addEmployee(employee : Employee): Observable<Object>{
    return this.http.post(this.url + '/addEmployee', employee);
  }

  updateEmployee(employee : Employee): Observable<Object>{
    return this.http.post(this.url + '/updateEmployee', employee);
  }

  deleteEmployee(employee: Employee) : Observable<Object> {
    return this.http.post(this.url+ '/deleteEmployee' , employee);
  }

  getEmployeeDetails(employeeId: number) : Observable<Employee> {
    return this.http.get<Employee>(this.url + `/getEmployeeDetails/${employeeId}`);
  }
}
