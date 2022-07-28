import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import {throwError } from 'rxjs'
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { 
    
  }

  getUser() {
    return this.http.get(ServiceUrls.GET_USER).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  getStates() {
    return this.http.get(ServiceUrls.GET_STATES).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}
