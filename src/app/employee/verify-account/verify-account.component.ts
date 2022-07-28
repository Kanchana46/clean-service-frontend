import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

  public firstname: string = "";
  public lastname: string = "";
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.firstname = params.fname;
        this.lastname = params.lname;
        this.employeeService.verifyAccount({userId: params.userId}).subscribe(
          data => {

          },
          error => {
            this.toastr.clear();
            this.toastr.error('Error account verification','Error', {
              timeOut: 7000,
              positionClass: "toast-top-center"
            });           
          }
        );
      }
    );
  }

}
