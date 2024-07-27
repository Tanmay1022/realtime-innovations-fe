import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { CreateEmployeeComponent } from './employee-details/create-employee/create-employee.component';

const routes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: 'create-employee', component:CreateEmployeeComponent},
  {path: 'create-employee/:id', component: CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
