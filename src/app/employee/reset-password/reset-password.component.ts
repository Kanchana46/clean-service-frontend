import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted = false;
  public mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  isSubmitted: boolean  = false;
  constructor(private formBuilder: FormBuilder, private customValidator: CustomvalidationService, private toastr: ToastrService,
    private employeeService: EmployeeService, public router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      // validator: MustMatch('password', 'confirmPassword')
      validator: this.customValidator.MatchPassword('password','confirmPassword'),
    });
    if(this.isSubmitted)
      this.checkVerificationCode();
  }

  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
        return;
    } else {

      let params = {
        userId: localStorage.getItem('userId'),
        password: this.resetPasswordForm.value.password
      }
      this.employeeService.resetPassword(params).subscribe(
        data => {
          this.resetPasswordForm.reset();
          this.resetPasswordForm.get("password")?.setErrors(null);
          this.resetPasswordForm.get("confirmPassword")?.setErrors(null);
          this.resetPasswordForm.get("verificationCode")?.setErrors(null);
          this.isSubmitted = true;
          this.toastr.clear();
          this.toastr.success('Password reset succesful','Success', {
            timeOut: 3000,
            positionClass: "toast-top-center"
          });
          if (this.router.url == '/admin/reset-password'){
            setTimeout(() => {
              this.router.navigateByUrl('/admin/login');
            }, 
            1000);
          } else {
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1000);
          }
        },
        error => {
          this.toastr.clear();
          this.toastr.error('Error password reset','Error', {
            timeOut: 3000,
            positionClass: "toast-top-center"
          });
        }
      )
    }
  }

  checkVerificationCode() {
    this.resetPasswordForm.get('verificationCode')?.valueChanges.
    pipe(debounceTime(1000)).
      subscribe(
        data => {
          this.employeeService.checkVerificationCode({
            userId: localStorage.getItem("userId"),
            vfCode: data!== null ? data.replace("-","") : ""
          }).subscribe(
            (data: any) => {
                if (!data['payload']) {
                  this.resetPasswordForm.get('verificationCode')?.setErrors({'incorrect': true});
                    this.toastr.clear();
                    this.toastr.error('Incorrect Verification code','Error', {
                      timeOut: 7000,
                      positionClass: "toast-top-center"
                    });
                } else {
                  this.resetPasswordForm.get('verificationCode')?.setErrors(null);
                }
            },
            (error: any) => {
                console.log(error)
            }
          )
        }
    );
  }

}
