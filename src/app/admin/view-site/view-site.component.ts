import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TagManagementService } from '../tag-management.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-site',
  templateUrl: './view-site.component.html',
  styleUrls: ['./view-site.component.scss']
})
export class ViewSiteComponent implements OnInit {

  getSiteDetail: any[] = [];
  tagDetails: any[] = [];

  constructor(private tagManagementService: TagManagementService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getSiteDetails()
    this.getTagDetails()
  }


  getSiteDetails() {
    this.tagManagementService.getSiteDetails().subscribe(
      (data: any) => {
        let getSiteDetail: any[] = []
        this.getSiteDetail =  data['payload'] as string [];  
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }

  getTagDetails() {
    this.tagManagementService.getTagDetails().subscribe(
      (data: any) => {
        this.tagDetails =  data['payload'] as string [];  
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  }


}
