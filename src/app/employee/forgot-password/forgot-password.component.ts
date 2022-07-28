import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
    private customValidator: CustomvalidationService, private employeeService: EmployeeService, public router: Router) { }

  ngOnInit(): void {

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
    //if (this.forgotPasswordForm.get("email")?.valid) {
      this.checkEmail();
    //}
  }
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
        return;
    }
    this.employeeService.requestNewPassword(this.forgotPasswordForm.value).subscribe(
      (data: any) => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
    if (this.router.url === "/forgot-password") {
      this.router.navigateByUrl('/reset-password');
    } else {
      this.router.navigateByUrl('/admin/reset-password');
    }
   // this.router.navigateByUrl("/reset-password");
  }


  checkEmail() {
    this.forgotPasswordForm.get('email')?.valueChanges.
    pipe(debounceTime(1000)).
      subscribe(
        data => {
          if (this.forgotPasswordForm.get("email")?.valid) {
            this.employeeService.checkEmail({email: data}).subscribe(
              (data: any) => {
                  if (data['payload'] === null) {
                    this.forgotPasswordForm.get('email')?.setErrors({'incorrect': true});
                      this.toastr.clear();
                      this.toastr.error('Email does not exist','Error', {
                        timeOut: 7000,
                        positionClass: "toast-top-center"
                      });
                  } else {
                    localStorage.setItem("userId", data['payload'].id);
                    this.forgotPasswordForm.get('email')?.setErrors(null);
                  }
              },
              (error: any) => {
                  console.log(error)
              }
            );
          }
        }
    );
  }
  

}
