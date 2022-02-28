import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, ApiService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    imageFile: File = null;
    imageTitle = '';
    imageDesc = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private apiService: ApiService,
        private toastr: ToastrService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        this.form = this.formBuilder.group({
                fullname : [null, Validators.required],
                position : [null, Validators.required],
                salary : [null, Validators.required],
                email : [null, Validators.required]
    
        });

        if (!this.isAddMode) {
            this.apiService.getEmployeeById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
                console.log(this.form.value);
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createEmployee();
        } else {
           this.updateEmployee();
        }
    }

    private createEmployee() {
        this.apiService.addEmployee(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Employee added successfully', { keepAfterRouteChange: true, displayDuration: 1000,
                        autoHide: true, });
                    this.router.navigate(['../'], { relativeTo: this.route });
            },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateEmployee() {
        this.apiService.updateEmployee(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  //  this.showSuccess()
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });            
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }


    showSuccess() {
        this.toastr.success('You are registered', 'Succes!');
      }
    
    
      showError() {
        this.toastr.error('You are not registered', 'Error!');
      }
    
    
}