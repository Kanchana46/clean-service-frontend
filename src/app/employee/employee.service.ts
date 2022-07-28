import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import {throwError } from 'rxjs'
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  checkEmail(email: any) {
    return this.http.post(ServiceUrls.CHECK_EMAIL, email).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  login(params: any) {
    return this.http.post(ServiceUrls.LOGIN, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  requestNewPassword(params: string) {
    return this.http.post(ServiceUrls.REQUEST_NEW_PASSWORD, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  checkVerificationCode(vfCode: any) {
    return this.http.post(ServiceUrls.CHECK_VF_CODE, vfCode).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  resetPassword(params: any) {
    return this.http.post(ServiceUrls.RESET_PASSWORD, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  verifyAccount(params: any) {
    return this.http.post(ServiceUrls.VERIFY_ACCOUNT, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  checkEmployeeNumber(params: any) {
    return this.http.post(ServiceUrls.CHECK_EMP_NO, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

  verify(params: any) {
    return this.http.post(ServiceUrls.VERIFY, params).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }

}

