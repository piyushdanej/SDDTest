import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit, OnChanges {
  name : string = "";
  email : string = "";
  address : string = "";
  phone: string = "";

  actionButtonLabel: string = "Add";

  @Input() updateEmployee : Employee;
  @Output() employeeAdded: EventEmitter<Employee>  = new EventEmitter();
  @Output() employeeUpdated : EventEmitter<Employee> = new EventEmitter();
  @Output() closeModal: EventEmitter<null>  = new EventEmitter();

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.updateEmployee) {
      this.name = this.updateEmployee.name;
      this.email = this.updateEmployee.email;
      this.phone = this.updateEmployee.phone;
      this.address = this.updateEmployee.address;
      this.actionButtonLabel = "Update";
    }else {
      this.clearValues();
      this.address =  "Add";
    }
  }

  addEmployee(){
    if(this.updateEmployee) {
      this.employeeUpdated.emit({
        name : this.name,
        email : this.email,
        address : this.address,
        phone : this.phone,
        id: this.updateEmployee.id       
      })
    }
    else {
      this.employeeAdded.emit({
        name : this.name,
        email : this.email,
        address : this.address,
        phone : this.phone,
        id: 0
      })
    }

    this.clearValues();
  }

  clearValues() {
    this.name = "";
    this.email = "";
    this.address = "";
    this.phone = "";
  }
  
}
