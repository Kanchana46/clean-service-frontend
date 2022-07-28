import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServiceUrls } from '../util/service-urls';

@Injectable({
  providedIn: 'root'
})
export class AreaManagementService {

  constructor(private http: HttpClient) { }

  addArea(area: any) {
    return this.http.post(ServiceUrls.ADD_AREA, area).pipe(
      map(response => {
        return response
      }),
      catchError(error => {
        return throwError(error)
      })
    );
  }
}
