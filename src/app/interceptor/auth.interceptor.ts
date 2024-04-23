import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let userData: any;
    //const data = localStorage.getItem('data');
    const token = localStorage.getItem('token');
    /*   if (token) {
      userData = JSON.parse(data!);

    } */
    const CloneRequest = request.clone({
      setHeaders: {
        Authentication: `Bearer ${token}`,
      },
    });
    return next.handle(CloneRequest);
  }
}
