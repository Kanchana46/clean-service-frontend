import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/admin.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  employeeDetails: any[] = []

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private toastr: ToastrService, public router: Router,private adminService: AdminService) { }

  ngOnInit(): void {
    this.getEmployeeDetails()
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.checkEmail();
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.login(this.loginForm.value)
    
  }

  checkEmail() {
    this.loginForm.get('email')?.valueChanges.
    pipe(debounceTime(1000)).
      subscribe(
        data => {
          this.employeeService.checkEmail({email: data}).subscribe(
            (data: any) => {
                if (data['payload'] === null) {
                    this.toastr.clear();
                    this.toastr.error('Email does not exist','Success', {
                      timeOut: 7000,
                      positionClass: "toast-top-center"
                    });
                } else{
                  if(this.router.url === '/admin/login' && data['payload'].category !== 'Admin') {
                    this.toastr.clear();
                      this.toastr.error('Enter Admin email','Success', {
                        timeOut: 7000,
                        positionClass: "toast-top-center"
                      });
                  }
                }
               
            },
            error => {
                console.log(error)
            }
          )
        }
    );
  }

  login(user: any){
    this.employeeService.login(user).subscribe(
      (data: any) => {
        let response = data['payload'];
        if (data['payload'].status === true) {
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.username);
          localStorage.setItem('empNo', response.employeeNo);
          localStorage.setItem('isVerified', response.isVerified);
          localStorage.setItem('token', response.token);
          if (data['payload'].isVerified === 1 ){
            if(this.router.url === '/admin/login'){
              this.router.navigateByUrl('/admin/siteManagement')
            } else {
              this.router.navigateByUrl('/dashboard')
            }
          }else{
            this.toastr.error('Account is not verify...!!!','Error', {
              timeOut: 7000,
              positionClass: "toast-top-center"
            });
          }
      } else {
        this.toastr.error('Please enter the correct password...!!!','Error', {
          timeOut: 7000,
          positionClass: "toast-top-center"
        });           
      }
      },
      error => {
      }
    );
  }

  getEmployeeDetails() {
    this.adminService.getEmployeeDetails().subscribe(
      (data: any) => {
        let employeeDetails: any[] = []
        this.employeeDetails =  data['payload'] as string [];  
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

}
