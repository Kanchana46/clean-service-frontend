import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employeeDetails: any[] = [];
   
  constructor(private adminService: AdminService, private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployeeDetails()
  }

  onUpdateUser(userId: string) {
    //this.adminService.userId.next(userId);
    this.adminService.setUid(userId)
    this.route.navigateByUrl("/admin/updateEmployee");
  }

  onDeleteUser(userId: User){
    this.adminService.deleteEmployee({Id: userId}).subscribe(
      (data: any) => {
        let index = this.employeeDetails.map(emp => emp.id).indexOf(userId);
        this.employeeDetails.splice(index, 1);
        this.toastr.clear();
        this.toastr.success('Employee deleted succesfully','Success', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
        this.toastr.clear();
        this.toastr.error('Error delete employee','Error', {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );

  }


  getEmployeeDetails() {
    this.adminService.getEmployeeDetails().subscribe(
      (data: any) => {
        let employeeDetails: any[] = []
        this.employeeDetails =  data['payload'] as string [];  
       /* employeeDetails.map((employee) => {
         this.employeeDetails.push(employee)
       
        })*/
        },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    
  } 
}
