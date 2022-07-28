import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import {throwError } from 'rxjs'
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(ServiceUrls.REGISTER_USER, user).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}
