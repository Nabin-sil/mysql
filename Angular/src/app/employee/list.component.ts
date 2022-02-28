import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AccountService, ApiService } from '@app/_services';
import { Employee } from '@app/_models';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    employees:any=[];
    object:any=[];
    books:any=[];
    search: string = "";
    spinner = false;
    totalRecords: string;
    p: number = 1;
    
    constructor(private accountService: AccountService, public http: HttpClient,
        private employeeService: ApiService) {}

    ngOnInit() {
    this.getAllEmployee();       
}



 getAllEmployee() {
   //  this.spinner = true;
        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees;
            console.log(employees);
            this.totalRecords = employees.results.length;
          // this.spinner = false;

        });
    }


      deleteEmployee(id: string) {
        const employee = this.employees.find(x => x.id === id);
      //  employee.isDeleting = true;
        if (confirm('Are you sure to delete this record ?') == true) { 
            employee.isDeleting = true;
            this.employeeService.deleteEmployee(id)
                    .pipe(first())
            .subscribe(() =>
            this.employees = this.employees.filter(x => x.id !== id));
    }
}


}