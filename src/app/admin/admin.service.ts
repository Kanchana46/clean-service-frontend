import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import {Subject, throwError } from 'rxjs'
import { ServiceUrls } from '../util/service-urls';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public userId = new Subject<any>();
  public  uid: any;
  constructor(private http: HttpClient) { }

  addEmployee(user: any) {
    return this.http.post(ServiceUrls.ADD_EMPLOYEE, user).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  getEmployeeDetails() {
    return this.http.get(ServiceUrls.GET_USER).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  getEmployeeDetailsByUserId(userId: any) {
    return this.http.post(ServiceUrls.GET_USER_BY_USERID, userId).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  public  setUid(id: any) {
    this.uid = id
  }

  public  getUid() {
    return this.uid;
  }

//for edit employee for admin
updateEmployee(user: any) {
    return this.http.post(ServiceUrls.UPDATE_EMPLOYEE, user).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  deleteEmployee(user: any) {
    return this.http.post(ServiceUrls.DELETE_EMPLOYEE, user).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

}


