import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeRoutingModule } from './employee-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmployeeRoutingModule,
        Ng2SearchPipeModule,
        FormsModule,
        NgxPaginationModule,
        ToastrModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class EmployeeModule { }