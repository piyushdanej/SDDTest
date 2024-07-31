import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Employee } from 'src/models/employee';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmployeeService } from 'src/services/employee.service';
import { filter, tap } from 'rxjs';
import { AuthenticateService } from 'src/services/authenticate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit{

  employeeList : Employee[];
  employeeListToShow : Employee[];
  empToDelete : Employee ;
  isDeleteAllowed = false;
  pageSize = 5;
  columnNames : string[] = ["name", "id", "email", "phone", "address" , "actions"];
  empToUpdate: Employee;
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('closeButton') closeButton: ElementRef; 

  constructor(private snackBar: MatSnackBar, 
    private employeeService : EmployeeService,
    private authService : AuthenticateService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
    this.isDeleteAllowed = this.authService.isUserSOP2();
  }

  ngAfterViewInit() {
  }

  getEmployeeList() {
    this.employeeService.getEmployees().pipe(
        tap(res => {
          this.employeeList = res
          this.setEmployeeListToShow(1);
        }),
        tap(_ => {
           this.dataSource.data = this.employeeList; 
           this.dataSource.paginator = this.paginator;
        })
      ).subscribe()
  }

  addEmployee(employee: Employee) {
    this.empToUpdate = null;
    this.employeeService.addEmployee(employee).pipe(
      filter(res => !!res),
      tap(res => {
        this.closeModal();
        this.getEmployeeList();
        this.snackBar.open("Employee added Successfully." , "" , {
          duration : 3000,
          panelClass : 'my-snackbar'
        });
      })
    ).subscribe()

  }

  onUpdateClicked(employeeForUpdate : Employee) {
    this.empToUpdate = employeeForUpdate;
    console.log("to update" , this.empToUpdate);
  }

  updateEmployee(employee: Employee) {

    this.employeeService.updateEmployee(employee).pipe(
      filter(res => !!res),
      tap(res => {
          this.empToUpdate  = null;
        }),
      tap(res => {
        this.closeModal();
        this.getEmployeeList();
        this.snackBar.open("Employee updated Successfully." , "" , {
          duration : 3000,
          panelClass : 'my-snackbar'
        });
      })
    ).subscribe()
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  onDeleteClicked(employeeForDelete : Employee) {
    this.empToDelete = employeeForDelete;
  }

  deleteEmployee() {
    if(this.empToDelete) {
      this.employeeService.deleteEmployee(this.empToDelete).pipe(
        filter(res => !!res),
        tap(res => {
          this.empToDelete = null;
        }),
        tap(_ => {
          this.snackBar.open("Employee Deleted" , "" , {
              duration : 3000,
              panelClass : 'my-snackbar'
          });
          this.getEmployeeList();
        })
      ).subscribe();
    }

    else {
      this.snackBar.open("No Employee Selected" , "" , {
          duration : 3000,
          panelClass : 'my-snackbar'
      })
    }
  }

  setEmployeeListToShow(pageNum : number){
    let startIndex = (pageNum -1) * this.pageSize;
    let endIndex = pageNum * this.pageSize;

    this.employeeListToShow = this.employeeList.slice(startIndex , endIndex);
  }
}
