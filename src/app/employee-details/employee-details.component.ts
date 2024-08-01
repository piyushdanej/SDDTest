import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Employee } from 'src/models/employee';
import { EmployeeService } from 'src/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
   employee : Employee;
    currentTime = new Date();
   constructor(private route: ActivatedRoute,
    private empService : EmployeeService
   ){}

   ngOnInit() : void {
    const id = this.route.snapshot.params['id'];
    this.getEmployeeDetails(id);
   }

   getEmployeeDetails(id : number) {
    this.empService.getEmployeeDetails(id).pipe(
      tap(res => {
        this.employee = res
        console.log("employee by id " , this.employee)
      })
    ).subscribe();
   }
}
