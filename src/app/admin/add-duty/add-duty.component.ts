import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Site } from 'src/app/models/site.model';
import { CommonService } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DutyManagementService } from '../duty-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-duty',
  templateUrl: './add-duty.component.html',
  styleUrls: ['./add-duty.component.scss']
})
export class AddDutyComponent implements OnInit {

 

  addDutyForm!: FormGroup;
  addDuty: any;
  submitted: boolean = false;

  duty = {
    dutyCode: null,
    dutyDesc: null, 
    hourlyRate: null
 }
  
  
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private dutyManagementService: DutyManagementService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    
    this.addDuty = this.duty;
    this.addDutyForm = this.formBuilder.group({
        dutyDesc: ['', Validators.required],
        hourlyRate: ['', Validators.required],
       
    });
  
    
  }

  get f() { return this.addDutyForm.controls; };

  onSubmit(){

    this.submitted = true;
    if (this.addDutyForm.invalid) {  
         return;
    } else  {
     
      this.addDuty.dutyDesc = this.addDutyForm.value.dutyDesc;
      this.addDuty.hourlyRate = this.addDutyForm.value.hourlyRate;
    
        this.addDuties(this.addDuty)
      
    }
  }


  addDuties(duty: any) {
    this.dutyManagementService.addDuty(duty).subscribe(
      (data: any) => {
        this.toastr.clear();
        this.toastr.success('Duty added succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      // this.onReset();
      setTimeout(() => {
        this.router.navigateByUrl('/admin/siteManagement');
      }, 1500);
      },
      (error: any) => {
        this.toastr.clear();
        this.toastr.error('Error Duty addition','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }

}
