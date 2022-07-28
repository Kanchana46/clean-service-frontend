import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Site } from 'src/app/models/site.model';
import { CommonService } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SiteManagementService } from '../site-management.service';
import { ToastrService } from 'ngx-toastr';
import { TagManagementService } from '../tag-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  assignTagForm!: FormGroup;
  assignTag: any;
  submitted: boolean = false;

  items: Array<any> = [];
  sites: Array<any> = [];
  areas: Array<any> = [];
  duties: Array<any> = [];
  siteManagers: Array<any> = [];
  teamLeaders: Array<any> = [];
  assitManagers: Array<any> = [];
  headCleaners: Array<any> = [];
  selectedStateValue: any = null;
  selectedSiteValue: any = null;
  selectedAreaValue: any = null;
  selectedDutiesValue: any = null;
  selectedHeadCleanerValue: any = null;
  
  tag = {
     tagId: null,
     siteId: null,
      areaCode: null,
      dutyCode: null,
      labourHrs: null
  }
  
  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
              private tagManagementService: TagManagementService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.getSiteDetails()
    this.getAreaDetails()
    this.getDutyDetails()
    
    this.assignTag = this.tag;
    this.assignTagForm = this.formBuilder.group({
      siteId: ['', Validators.required],
      areaCode: ['', Validators.required],
      dutyCode: ['', Validators.required],
      labourHrs: ['', Validators.required],
      
       
    });
  
    
  }

  get f() { return this.assignTagForm.controls; };

  onSubmit(){
    
    this.submitted = true;
    if (this.assignTagForm.invalid) {  
         return;
    } else  {
     
      this.assignTag.siteId = this.assignTagForm.value.siteId;
      this.assignTag.areaCode = this.assignTagForm.value.areaCode;
      this.assignTag.dutyCode = this.assignTagForm.value.dutyCode;
      this.assignTag.labourHrs = this.assignTagForm.value.labourHrs;
     
        this.assignTags(this.assignTag)
      
    }
  }

  assignTags(tag: any) {
    this.tagManagementService.assignTag(tag).subscribe(
      (data: any) => {
        this.toastr.clear();
        this.toastr.success('Tag added succesfully','Success', {
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
        this.toastr.error('Error tag addition','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }


  getSiteDetails() {
    this.tagManagementService.getSiteDetails().subscribe(
      (data: any) => {
         this.sites = data['payload'].filter((site: any) =>{
          return site.siteId 
          
        })

       
       

        this.selectedSiteValue = this.sites[0]
      
      
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  getAreaDetails() {
    this.tagManagementService.getAreaDetails().subscribe(
      (data: any) => {
         this.areas = data['payload'].filter((area: any) =>{
        return area.areaCode 
          
        })
         this.selectedAreaValue = this.areas[0]
      
      
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }


  getDutyDetails() {
    this.tagManagementService.getDutyDetails().subscribe(
      (data: any) => {
         this.duties = data['payload'].filter((duty: any) =>{
          return duty.dutyCode 
          
        })
         this.selectedDutiesValue = this.duties[0]
      
      
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  
  onClickSiteChange() {
    this.tagManagementService.getSiteDetails().subscribe(
      (data: any) => {
       this.items = this.sites.filter(item => {
          return item.siteId === this.selectedSiteValue
        }).map(item =>  item.company + "," + '\n' + item.siteDesc)
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

    
  }

  onClickAreaChange() {
     this.tagManagementService.getAreaDetails().subscribe(
       (data: any) => {
        this.items = this.areas.filter(item => {
           return item.areaCode === this.selectedAreaValue
         }).map(item =>  item.areaCode + "," + '\n' + item.areaDesc)
      
       console.log(this.items);
        
       },
       (err: HttpErrorResponse) => {
         console.log (err.message);
       }
     );
   }



   onClickDutyChange() {
     this.tagManagementService.getDutyDetails().subscribe(
       (data: any) => {
        this.items = this.duties.filter(item => {
           return item.dutyCode === this.selectedDutiesValue
         }).map(item =>  item.dutyCode + "," + '\n' + item.dutyDesc+ '\n' + item.hourlyRate)  
       },
       (err: HttpErrorResponse) => {
         console.log (err.message);
       }
     );
   }

}
