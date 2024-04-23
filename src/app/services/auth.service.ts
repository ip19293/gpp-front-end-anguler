import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/login', data);
  }

  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/signup', data);
  }
  forget(data: any) {
    this.http
      .post('http://localhost:5000/auth/forgotPassword', data)
      .subscribe((result: any) => {
        this.router.navigate(['/admin/login/reset']);
        alert(`STATUS:${result.status} ${result.message}`);
      });
  }

  reset(data: any, token: string) {
    console.log(token);
    this.http
      .patch(`http://localhost:5000/auth/resetPassword/${token}`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
