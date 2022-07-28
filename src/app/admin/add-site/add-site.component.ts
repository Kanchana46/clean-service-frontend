import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/site.model';
import { CommonService } from 'src/app/services/common.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SiteManagementService } from '../site-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss']
})
export class AddSiteComponent implements OnInit {

  model!: NgbDateStruct;
  today = this.calendar.getToday();

  addSiteForm!: FormGroup;
  addSite: any;
  submitted: boolean = false;
  siteType = ["Office & warehouses", "Building Towers", "Super Markets", "Childcare Center", "Community center",
              "Hospitals", "Age care center", "Medical Center", "Schools", "Kindergartens", "Car Parks",
              "Night Clubs and Pubs", "Play ground centers", "Cinemas", "Construction sites(Building)",
              "Resturents & commericial kithens"];
  selectedValue = this.siteType[0];
 
  states: Array<any> = [];
  siteManagers: Array<any> = [];
  teamLeaders: Array<any> = [];
  assitManagers: Array<any> = [];
  headCleaners: Array<any> = [];
  selectedStateValue: any = null;
  selectedSiteMgrValue: any = null;
  selectedTeamLeaderValue: any = null;
  selectedAssitManagerValue: any = null;
  selectedHeadCleanerValue: any = null;
  config:any;
  assignedDates: Array<any> = [];
  asstManagerDates: Array<any> = [];
  headCleanerDates: Array<any> = [];
  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private commonService: CommonService,
              private siteManagementService: SiteManagementService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getStates();
    this.getEmployeeName();
    
  this.config = "IMonthPickerConfig"
    this.addSite = new Site(null);
    this.addSiteForm = this.formBuilder.group({
        company: ['', Validators.required],
        siteDesc: ['', Validators.required],
        location: ['', Validators.required],
        siteType: ['', Validators.required],
        address: ['', Validators.required],
        suburb: ['', Validators.required],
        postCode: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        siteMgr: ['', Validators.required],
        siteAstMgr: ['', Validators.required],
        headCleaner: ['', Validators.required],
        teamLeader:['', Validators.required],
        startDate:['', Validators.required],
        endDate:['', Validators.required],
    });
    this.getAssignedDates();
  }

  get f() { return this.addSiteForm.controls; };

  onSubmit(){
    this.submitted = true;
    if (this.addSiteForm.invalid) {  
         return;
    } else  {
      this.addSite.company = this.addSiteForm.value.company;
      this.addSite.siteDesc = this.addSiteForm.value.siteDesc;
      this.addSite.location = this.addSiteForm.value.location;
      this.addSite.siteType = this.addSiteForm.value.siteType;
      this.addSite.address = this.addSiteForm.value.address;
      this.addSite.suburb = this.addSiteForm.value.suburb;
      this.addSite.postCode = this.addSiteForm.value.postCode;
      this.addSite.state = this.addSiteForm.value.state;
      this.addSite.country = this.addSiteForm.value.country;
      this.addSite.siteMgr = this.addSiteForm.value.siteMgr;
      this.addSite.siteAstMgr = this.addSiteForm.value.siteAstMgr;
      this.addSite.headCleaner = this.addSiteForm.value.headCleaner;
      this.addSite.teamLeader = this.addSiteForm.value.teamLeader;
      this.addSite.startDate = this.addSiteForm.value.startDate;
      this.addSite.endDate = this.addSiteForm.value.endDate;
      this.addSite.siteManagerId = this.selectedSiteMgrValue.id;
      this.addSite.siteAsstManagerId = this.selectedAssitManagerValue.id;
      this.addSite.teamLeaderId = this.selectedTeamLeaderValue.id;
      this.addSite.headCleanerId = this.selectedHeadCleanerValue.id;
      this.addSites(this.addSite)
    }

  }

  onReset(){}

  addSites(site: Site) {
    this.siteManagementService.addSite(site).subscribe(
      (data: any) => {
        this.toastr.clear();
        this.toastr.success('site added succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
       this.onReset();
       setTimeout(() => {
        this.router.navigateByUrl('/admin/siteManagement');
      }, 1500);
      },
      (error: any) => {
        this.toastr.clear();
        this.toastr.error('Error site addition','Error', {
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


  getEmployeeName() {
    this.siteManagementService.getEmployeeName().subscribe(
      (data: any) => {
         this.siteManagers = data['payload'].filter((employee: any) =>{
          return employee.category == 'Site Manger' 
        })
        this.teamLeaders = data['payload'].filter((employee: any) =>{
          return employee.category == 'Team Leader' 
        })
        this.assitManagers = data['payload'].filter((employee: any) =>{
          return employee.category == 'Assist. Manager' 
        })
        this.headCleaners = data['payload'].filter((employee: any) =>{
          return employee.category == 'Head Cleaner' 
        })

        this.selectedSiteMgrValue = this.siteManagers[0]
        this.selectedTeamLeaderValue = this.teamLeaders[0]
        this.selectedAssitManagerValue = this.assitManagers[0]
        this.selectedHeadCleanerValue = this.headCleaners[0]
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  onChangeHeadCleaner() {
    console.log(this.selectedHeadCleanerValue.id)
  }

  onChangeSiteManager() {
    console.log(this.selectedSiteMgrValue)
  }
  onChangeAsstManager() {
    console.log(this.selectedAssitManagerValue)
  }

  onChangeTeamLeader() {
    console.log(this.selectedTeamLeaderValue)
  }

  onClickPopOver(role: string) {
    this.headCleanerDates = []
    this.asstManagerDates = []
    if (role === 'siteAsstManager') {
      this.asstManagerDates = this.assignedDates.filter(item => {
        return item.siteAsstManagerId === this.selectedAssitManagerValue.id
      }).map(item =>  item.startDate+ " To " + item.endDate)
    } else if (role === 'headCleaner') {
      this.headCleanerDates = this.assignedDates.filter(item => {
        return item.headCleanerId === this.selectedHeadCleanerValue.id
      }).map(item =>  item.startDate+ " To " + item.endDate)
    }
    
    //this.assignedDates

    
  }

  getAssignedDates() {
    this.siteManagementService.getAssignedDates().subscribe(
      (data: any) => {
        this.assignedDates = data['payload']
      },
      (error: any) => {
        this.toastr.clear();
        this.toastr.error('Error site addition','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }

}
