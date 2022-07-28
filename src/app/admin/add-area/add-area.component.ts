import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Site } from 'src/app/models/site.model';
import { CommonService } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SiteManagementService } from '../site-management.service';
import { ToastrService } from 'ngx-toastr';
import { AreaManagementService } from '../area-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit {

  addAreaForm!: FormGroup;
  addArea: any;
  submitted: boolean = false;
  
   area = {
    
    areaCode: null, 
    areaDesc: null
 }
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private areaManagementService: AreaManagementService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    
    this.addArea = this.area;
    this.addAreaForm = this.formBuilder.group({
        areaDesc: ['', Validators.required],
 });
  
    
  }

  get f() { return this.addAreaForm.controls; };

  onSubmit(){

    this.submitted = true;
    if (this.addAreaForm.invalid) {  
         return;
    } else  {
     
      this.addArea.areaDesc = this.addAreaForm.value.areaDesc;
      this.addAreas(this.addArea)
      
    }

  }

  addAreas(area: any) {
    this.areaManagementService.addArea(area).subscribe(
      (data: any) => {
        this.toastr.clear();
        this.toastr.success('Area added succesfully','Success', {
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
        this.toastr.error('Error area addition','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }


}
