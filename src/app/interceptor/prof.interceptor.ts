import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProfInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get token from local storage
    const prof_id = localStorage.getItem('prof_id');
    // Clone the request to avoid mutating the original request
    let authReq = request.clone();
    // Add Authorization header if prof_id exists
    if (prof_id) {
      authReq = request.clone({
        setParams: {
          id: prof_id,
        },
      });
    }
    // Pass on the cloned request
    return next.handle(authReq);
  }
}
