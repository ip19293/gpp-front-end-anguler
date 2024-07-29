import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { navbarData } from 'src/app/sidenav/helper/sidenav.data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  navbarData = navbarData;
  constructor(private http: HttpClient, private router: Router) {}
  isLoggedIn(): boolean {
    /* let token = localStorage.getItem('token');
    let role = localStorage.getItem('role'); */
    /*    if (localStorage.getItem('role') === 'professeur') {
      return !!(
        localStorage.getItem('token') && localStorage.getItem('prof_id')
      );
    } else {
      return !!localStorage.getItem('token');
    } */
    /*   if (localStorage.getItem('role') === 'professeur') {
      return !!localStorage.getItem('prof_id');
    } */
    return !!localStorage.getItem('token');
  }
  isLoggedInProf(): boolean {
    /*     if (this.navbarData.length > 0) {
      console.log('route1:' + this.navbarData[2].routerLink);
    }
    console.log('prof_id:' + localStorage.getItem('prof_id'));
    return false; */
    return !!localStorage.getItem('prof_id');
  }
  logout(): void {
    localStorage.removeItem('prof_id');
    localStorage.removeItem('data');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    //localStorage.clear();
  }

  login(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/login', data).pipe(
      tap((response) => {
        // Assuming the token is returned in the response
        localStorage.setItem('token', response.token);
        localStorage.setItem('data', JSON.stringify(response.data));
        localStorage.setItem('role', response.data.user.role);
        if (response.data.user.role === 'professeur') {
          localStorage.setItem('prof_id', response.data.professeur._id);
        }
      })
    );
  }
  verification(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/verification', data);
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
  forgetPassword(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/auth/forgotPassword', data);
    /*     .subscribe((result: any) => {
        this.router.navigate(['/admin/login/reset']);
        alert(`STATUS:${result.status} ${result.message}`);
      }); */
  }
  reset(data: any, token: string) {
    return this.http.patch(
      `http://localhost:5000/auth/resetPassword/${token}`,
      data
    );
  }
}
