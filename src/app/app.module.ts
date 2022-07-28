import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './employee/reset-password/reset-password.component';
import { RegisterComponent } from './employee/register/register.component';
import { ForgotPasswordComponent } from './employee/forgot-password/forgot-password.component';
import { LoginComponent } from './employee/login/login.component';
import { TokenInterceptor } from './util/token-interceptor';
import { VerifyAccountComponent } from './employee/verify-account/verify-account.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { EmpCardComponent } from './admin/emp-card/emp-card.component';
import { EmpCardHeaderComponent } from './admin/emp-card-header/emp-card-header.component';

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
   } from "@angular/fire/storage";
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SiteManagementComponent } from './admin/site-management/site-management.component';
import { AddSiteComponent } from './admin/add-site/add-site.component';
import { AddAreaComponent } from './admin/add-area/add-area.component';
import { AddDutyComponent } from './admin/add-duty/add-duty.component';
import { AssignComponent } from './admin/assign/assign.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewSiteComponent } from './admin/view-site/view-site.component';
import { DashboardComponent } from './employee/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    MatchPasswordDirective,
    PasswordPatternDirective,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    EmpCardComponent,
    EmpCardHeaderComponent,
    AdminDashboardComponent,
    SiteManagementComponent,
    AddSiteComponent,
    AddAreaComponent,
    AddDutyComponent,
    AssignComponent,
    ViewSiteComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    BrowserAnimationsModule,
    DpDatePickerModule ,
    NgbModule,
    ToastrModule.forRoot({
      closeButton: true,
      preventDuplicates: true,
    }),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
