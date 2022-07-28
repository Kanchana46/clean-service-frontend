import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceUrls } from '../util/service-urls';
@Injectable({
  providedIn: 'root'
})
export class TagManagementService {

  constructor(private http: HttpClient) { }

  assignTag(tag: any) {
    return this.http.post(ServiceUrls.ASSIGN_TAG, tag).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  getSiteDetails() {
    return this.http.get(ServiceUrls.GET_SITE_TAG_DETAILS).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  getAreaDetails() {
    return this.http.get(ServiceUrls.GET_AREA_TAG_DETAILS).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  getDutyDetails() {
    return this.http.get(ServiceUrls.GET_DUTY_TAG_DETAILS).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }


  getTagDetails() {
    return this.http.get(ServiceUrls.GET_TAG_DETAILS).pipe(
      map(response => {
        return response
       
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}




