import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'employees',
    component : EmployeeListComponent,
    canActivate: [AuthGuard]

  },
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
