import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common.service';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UserService } from 'src/app/services/user.service';

import { environment } from '../../../environments/environment'
import { EmployeeService } from 'src/app/employee/employee.service';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';

//import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  newEmployee: any;
  editEmployee: any;
 
  submitted: boolean = false;
  category = ["Site Manger", "Assist. Manager", "Team Leader", "Head Cleaner", "Cleaner"];
  selectedValue = this.category[0];
  employeeDetails: any[] = []
  sub:  Subscription | undefined
  userId: any = null;
  existingEmail: string = ""
  isRegistered: boolean = false;
  public mask = [ /[0-9]/, /\d/ , ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  selectedStateValue = null;
  states: Array<any> = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private customValidator: CustomvalidationService, 
              private commonService: CommonService, private toastr: ToastrService,
              private employeeService: EmployeeService, private adminServices: AdminService) { }

  ngOnInit() {
    this.getStates();
    this.userId = this.adminServices.getUid();
    this.newEmployee = new User(null);
    if (this.isRegistered) {
      this.addEmployeeForm = this.formBuilder.group({
        employeeNo: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        category: ['', Validators.required],
        taxFileNo: ['', Validators.required],
        hourlyRate: ['', Validators.required],
        penalty1: ['', Validators.required],
        penalty2: ['', Validators.required],
        gender: ['male', Validators.required],
        mobileNo: ['', Validators.required],
        phone: ['', Validators.required],
        streetAddress: ['', Validators.required],
        postalCode: ['', Validators.required], 
        state: ['', Validators.required],
      });    
    } else {
      this.addEmployeeForm = this.formBuilder.group({
        employeeNo: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        category: ['', Validators.required],
        taxFileNo: ['', Validators.required],
        hourlyRate: ['', Validators.required],
        penalty1: ['', Validators.required],
        penalty2: ['', Validators.required],
        
      });    
    }
    
    this.checkEmail()
    this.getEmployeeDetailsByUserId(this.adminServices.getUid())
  }

  cancel() {
      const invalid = [];
      const controls = this.addEmployeeForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      //return invalid;
  }

// convenience getter for easy access to form fields

  get f() { return this.addEmployeeForm.controls; };

  onSubmit() {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {  
         return;
    } else  {
      this.newEmployee.employeeNo = this.addEmployeeForm.value.employeeNo;
      this.newEmployee.firstName = this.addEmployeeForm.value.firstName;
      this.newEmployee.lastName = this.addEmployeeForm.value.lastName;
      this.newEmployee.email = this.addEmployeeForm.value.email;
      this.newEmployee.category = this.addEmployeeForm.value.category;
      this.newEmployee.taxFileNo = this.addEmployeeForm.value.taxFileNo;
      this.newEmployee.hourlyRate = this.addEmployeeForm.value.hourlyRate;
      this.newEmployee.penalty1 = this.addEmployeeForm.value.penalty1;
      this.newEmployee.penalty2 = this.addEmployeeForm.value.penalty2;
      this.newEmployee.verifyAccURL = environment.API_URL
      if (this.isRegistered) {
        this.newEmployee.gender = this.addEmployeeForm.value.gender;
        this.newEmployee.mobileNo = this.addEmployeeForm.value.mobileNo;
        this.newEmployee.phone = this.addEmployeeForm.value.phone;
        this.newEmployee.streetAddress = this.addEmployeeForm.value.streetAddress;
        this.newEmployee.postalCode = this.addEmployeeForm.value.postalCode;
        this.newEmployee.state = this.addEmployeeForm.value.state;
      }
     
      if (this.adminServices.getUid() !== undefined) {
        this.updateEmployee(this.newEmployee)
      } else {
        this.addEmployee(this.newEmployee)
      }
    }
  
  }
  
  onReset(){
    this.addEmployeeForm.reset();
    this.addEmployeeForm.get('email')?.setErrors(null)
    this.addEmployeeForm.get('employeeNo')?.setErrors(null)
    this.addEmployeeForm.get('firstName')?.setErrors(null)
    this.addEmployeeForm.get('lastName')?.setErrors(null)
    this.addEmployeeForm.get('category')?.setErrors(null)
    this.addEmployeeForm.get('taxFileNo')?.setErrors(null)
    this.addEmployeeForm.get('hourlyRate')?.setErrors(null)
    this.addEmployeeForm.get('penalty1')?.setErrors(null)
    this.addEmployeeForm.get('penalty2')?.setErrors(null)
    this.addEmployeeForm.get('taxFileNo')?.setErrors(null)
  }

  
  addEmployee(user: User) {
    this.adminServices.addEmployee(user).subscribe(
      (data: any) => {
        this.toastr.clear();
        this.toastr.success('Registered succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
       this.onReset();
      },
      (error: any) => {
        this.toastr.clear();
        this.toastr.error('Error registration','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }

  checkEmail() {
      this.addEmployeeForm.get('email')?.valueChanges.
        pipe(debounceTime(1000)).
          subscribe(
            data => {
              this.employeeService.checkEmail({email: data}).subscribe(
                (data: any) => {
                  let res = data['payload']
                  if (res !== null && res.email !== this.existingEmail) {
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


  getEmployeeDetailsByUserId(userId: string) {
    this.adminServices.getEmployeeDetailsByUserId({id: userId}).subscribe(
      (data: any) => {
        if (this.userId) {
          if (data['payload'].isVerified === 0) {
            this.isRegistered = false;
            this.addEmployeeForm.patchValue({
              employeeNo: data['payload'].employeeNo,
              firstName: data['payload'].firstName,
              lastName: data['payload'].lastName,
              email: data['payload'].email,
              category: data['payload'].category,
              taxFileNo: data['payload'].taxFileNo,
              hourlyRate: data['payload'].hourlyRate,
              penalty1: data['payload'].penalty1,
              penalty2: data['payload'].penalty2
            });
          } else {
            this.isRegistered = true;
            this.addEmployeeForm.patchValue({
              employeeNo: data['payload'].employeeNo,
              firstName: data['payload'].firstName,
              lastName: data['payload'].lastName,
              email: data['payload'].email,
              category: data['payload'].category,
              taxFileNo: data['payload'].taxFileNo,
              hourlyRate: data['payload'].hourlyRate,
              penalty1: data['payload'].penalty1,
              penalty2: data['payload'].penalty2,
              gender: data['payload'].gender  ,
              mobileNo: data['payload'].mobileNo,
              phone: data['payload'].phone,
              streetAddress: data['payload'].streetAddress,
              postalCode: data['payload'].postalCode,
              state: data['payload'].state,
            });
          }
            
        }
        this.existingEmail = this.addEmployeeForm.value.email;
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  //admin:edit employee
  updateEmployee(user: User) {
    this.adminServices.updateEmployee(user).subscribe(
      data => {
        console.log(data)
        this.toastr.clear();
        this.toastr.success('Employee updated succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
       this.onReset();
      },
      error => {
        this.toastr.clear();
        this.toastr.error('Error update employee','Error', {
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
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }



}