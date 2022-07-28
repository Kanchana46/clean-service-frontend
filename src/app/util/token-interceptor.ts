import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = String(localStorage.getItem('token'));
        console.log("intercept")
        console.log(token)
        request = request.clone({
        setHeaders: {
            authorization: token
        }
        });
        return next.handle(request);
  }
}