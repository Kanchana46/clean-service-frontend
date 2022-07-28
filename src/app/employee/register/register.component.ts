import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common.service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserService } from 'src/app/services/user.service';
import { EmployeeService } from '../employee.service';
import { environment } from '../../../environments/environment'
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerUser: any;
  submitted: boolean = false;
  category = ["Site Manger", "Assist. Manager", "Team Leader", "Head Cleaner", "Cleaner"];
  selectedValue = this.category[0];
  public mask = [ /[0-9]/, /\d/ , ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  states: Array<any> = [];
  selectedStateValue = null;
  downloadURL: Observable<string> | undefined;
  fb!: string;
  uploadProgress$: any;
  imageURL: any;
  userEmail!: string;
  userId!: string;
  isSubmitted: boolean = false;

  vrCodeForm!: FormGroup;
  public vr_mask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  showVrCode: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private customValidator: CustomvalidationService, 
              private commonService: CommonService, private toastr: ToastrService,
              private employeeService: EmployeeService,
              private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
    this.getStates();
    this.registerUser = new User(null);
    this.registerForm = this.formBuilder.group({
        employeeNo: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['male', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        category: ['', Validators.required],
        mobileNo: ['', Validators.required],
        phone: ['', Validators.required],
        streetAddress: ['', Validators.required],
        postalCode: ['', Validators.required], 
        state: ['', Validators.required],
        taxFileNo: ['', Validators.required],
        hourlyRate: ['', Validators.required],
        penalty1: ['', Validators.required],
        penalty2: ['', Validators.required],
        downloadURL: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    },{
       // validator: MustMatch('password', 'confirmPassword')
       validator: this.customValidator.MatchPassword('password','confirmPassword'),
     }); 
    this.checkEmail();
    this.checkEmployeeNumber();

    // VR Code
    this.vrCodeForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required]]
    });
}

// convenience getter for easy access to form fields

  get f() { return this.registerForm.controls; };


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {  
         return;
    } else  {
      this.registerUser.id = this.userId;
      this.registerUser.employeeNo = this.registerForm.value.employeeNo;
      this.registerUser.firstName = this.registerForm.value.firstName;
      this.registerUser.lastName = this.registerForm.value.lastName;
      this.registerUser.gender = this.registerForm.value.gender;
      this.registerUser.email = this.registerForm.value.email;
      this.registerUser.password = this.registerForm.value.password;
      this.registerUser.confirmPassword = this.registerForm.value.confirmPassword;
      this.registerUser.category = this.registerForm.value.category;
      this.registerUser.mobileNo = this.registerForm.value.mobileNo;
      this.registerUser.phone = this.registerForm.value.phone;
      this.registerUser.streetAddress = this.registerForm.value.streetAddress;
      this.registerUser.postalCode = this.registerForm.value.postalCode;
      this.registerUser.state = this.registerForm.value.state;
      this.registerUser.taxFileNo = this.registerForm.value.taxFileNo;
      this.registerUser.hourlyRate = this.registerForm.value.hourlyRate;
      this.registerUser.penalty1 = this.registerForm.value.penalty1;
      this.registerUser.penalty2 = this.registerForm.value.penalty2;
      this.registerUser.downloadURL = this.fb;
      this.registerUser.verifyAccURL = environment.API_URL
      this.registerUser.vrCode =  Math.floor(100000 + Math.random() * 900000);
      this.register(this.registerUser)
      
    }
  
  }

  onReset(){
    this.registerForm.reset();
    this.registerForm.get('email')?.setErrors(null)
    this.registerForm.get('employeeNo')?.setErrors(null)
    this.registerForm.get('firstName')?.setErrors(null)
    this.registerForm.get('lastName')?.setErrors(null)
    this.registerForm.get('gender')?.setErrors(null)
    this.registerForm.get('password')?.setErrors(null)
    this.registerForm.get('confirmPassword')?.setErrors(null)
    this.registerForm.get('category')?.setErrors(null)
    this.registerForm.get('mobileNo')?.setErrors(null)
    this.registerForm.get('phone')?.setErrors(null)
    this.registerForm.get('streetAddress')?.setErrors(null)
    this.registerForm.get('postalCode')?.setErrors(null)
    this.registerForm.get('state')?.setErrors(null)
    this.registerForm.get('taxFileNo')?.setErrors(null)
    this.registerForm.get('hourlyRate')?.setErrors(null)
    this.registerForm.get('penalty1')?.setErrors(null)
    this.registerForm.get('penalty2')?.setErrors(null)
    this.registerForm.get('state')?.setErrors(null)
    this.registerForm.get('taxFileNo')?.setErrors(null)
    this.registerForm.get('acceptTerms')?.setErrors(null)
    this.registerForm.get('downloadURL')?.setErrors(null)
  }

  
  register(user: User) {
    this.userService.registerUser(user).subscribe(
      data => {
        this.toastr.clear();
        this.toastr.success('Registered succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
        this.isSubmitted = true;
       this.onReset();
       /*setTimeout(() => {
        this.router.navigateByUrl('/');
       }, 1500);*/
       this.showVrCode = true;
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error registration','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }

  getStates() {
    this.commonService.getStates().subscribe(
      (data: any) => {
        let states: any[] = []
        states =  data['payload'] as string [];  
        states.map((state) => {
          this.states.push(state.name)
        })
        this.selectedStateValue = this.states[0]
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  checkEmail() {
      this.registerForm.get('email')?.valueChanges.
        pipe(debounceTime(1000)).
          subscribe(
            data => {
              this.employeeService.checkEmail({email: data}).subscribe(
                (data: any) => {  
                    if (data['payload'] !== null && this.userEmail !== this.registerForm.value.email) {
                        this.toastr.clear();
                        this.toastr.error('Email already exists.','Error', {
                          timeOut: 7000,
                          positionClass: "toast-top-center"
                        });
                    } else {

                    }
                },
                error => {
                    console.log(error)
                }
              )
            }
          );
  }

  checkEmployeeNumber() {
    if (!this.isSubmitted) {
      this.registerForm.get('employeeNo')?.valueChanges.
        pipe(debounceTime(1000)).
          subscribe(
            data => {
              this.employeeService.checkEmployeeNumber({empNo: data}).subscribe(
                (data: any) => {
                    if (data['payload'] === null && !this.isSubmitted) {
                        this.toastr.clear();
                        this.toastr.error("Employee No. does not exist","Error", {
                          timeOut: 7000,
                          positionClass: "toast-top-center"
                        });
                        this.registerForm.get('employeeNo')?.setErrors({error: "true"});
                       // this.registerForm.reset();
                    } else {
                      if (!this.isSubmitted) {
                        this.setFormValues(data['payload'])
                        this.registerForm.get('employeeNo')?.setErrors(null);
                        this.userEmail = data['payload'].email;
                        this.userId = data['payload'].id;
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
  }

  onFileSelected(event: any) {
    this.registerForm.get('chooseFile')?.setErrors({error: "true"});
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `UserProfile/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`UserProfile/${n}`, file);
    //this.uploadProgress$ = task.percentageChanges()
    this.uploadProgress$ = "pending";
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.uploadProgress$ = "success";
              
              let reader = new FileReader();
              reader.readAsDataURL(event.target.files[0]); // read file as data url
              reader.onload = (evt) => { // called once readAsDataURL is completed
                this.imageURL = evt.target?.result;
              }
            }
            console.log(this.fb);
            this.registerForm.get('chooseFile')?.setErrors(null)
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  setFormValues(userData: any) {
    this.registerForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      category: userData.category,
      taxFileNo: userData.taxFileNo,
      hourlyRate: userData.hourlyRate,
      penalty1: userData.penalty1,
      penalty2: userData.penalty2
    });
  }

  verify() {
    let params = {
      userId: this.userId,
      vrCode: this.vrCodeForm.value.verificationCode
    }
    this.employeeService.verify(params).subscribe(
      (data: any) => {
        let res = data['payload'] 
        if (res) {
          this.toastr.clear();
          this.toastr.success('Account verified successfully.','Success', {
            timeOut: 7000,
            positionClass: "toast-top-center"
          });
        } else {
          this.toastr.clear();
          this.toastr.error('Account verified unsuccessful.','Error', {
            timeOut: 7000,
            positionClass: "toast-top-center"
          });
        }
        
      },
      error => {

      }
    );
  }

}
