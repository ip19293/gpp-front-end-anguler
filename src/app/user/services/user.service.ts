import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  users: any;
  constructor(private http: HttpClient, private router: Router) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/user', {
      headers: this._headers,
    });
  }
  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/user/${id}`, {
      headers: this._headers,
    });
  }
  getProfesseur(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/user/${id}/professeur`, {
      headers: this._headers,
    });
  }

  addUser(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/user', data);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/user/${id}`, {
      headers: this._headers,
    });
  }
  activeOrDeactiveUser(id: string): Observable<any> {
    return this.http.patch(
      `http://localhost:5000/user/${id}/active`,
      {},
      {
        headers: this._headers,
      }
    );
  }
  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/user/${id}`, data, {
      headers: this._headers,
    });
  }
}
