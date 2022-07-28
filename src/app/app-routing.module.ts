import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAreaComponent } from './admin/add-area/add-area.component';
import { AddDutyComponent } from './admin/add-duty/add-duty.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { AddSiteComponent } from './admin/add-site/add-site.component';
import { AssignComponent } from './admin/assign/assign.component';
import { EmpCardHeaderComponent } from './admin/emp-card-header/emp-card-header.component';
import { EmpCardComponent } from './admin/emp-card/emp-card.component';
import { SiteManagementComponent } from './admin/site-management/site-management.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { ViewSiteComponent } from './admin/view-site/view-site.component';
import { DashboardComponent } from './employee/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './employee/forgot-password/forgot-password.component';
import { LoginComponent } from './employee/login/login.component';
import { RegisterComponent } from './employee/register/register.component';
import { ResetPasswordComponent } from './employee/reset-password/reset-password.component';
import { VerifyAccountComponent } from './employee/verify-account/verify-account.component';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-account', component: VerifyAccountComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/reset-password', component: ResetPasswordComponent },
  { path: 'admin/forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
 // { path: 'add-employee', component: AddEmployeeComponent },
  //{ path: 'view-employee', component: ViewEmployeeComponent },
  { path: 'admin', component: EmpCardComponent, children: [
      { path: 'addEmployee', component: AddEmployeeComponent},
      { path: 'updateEmployee', component: AddEmployeeComponent},
      { path: 'viewEmployee/details', component: AddEmployeeComponent},
      { path: 'viewEmployee', component: ViewEmployeeComponent},
      { path: 'siteManagement', component: SiteManagementComponent },
      { path: 'addSite', component: AddSiteComponent },
      { path: 'addArea', component: AddAreaComponent },
      { path: 'addDuty', component: AddDutyComponent },
      { path: 'assign', component: AssignComponent },
      { path: 'viewSite', component: ViewSiteComponent }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
