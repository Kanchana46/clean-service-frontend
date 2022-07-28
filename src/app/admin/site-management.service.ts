import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class SiteManagementService {

  constructor(private http: HttpClient) { }

  addSite(site: any) {
    return this.http.post(ServiceUrls.ADD_SITE, site).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  getEmployeeName() {
    return this.http.get(ServiceUrls.GET_EMPLOYEE_NAME).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  getAssignedDates() {
    return this.http.get(ServiceUrls.GET_ASSIGNED_DATES).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  
}
