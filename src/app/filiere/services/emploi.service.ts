import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmploiService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  URL_F = 'http://localhost:5000/emploi';
  constructor(private http: HttpClient, private router: Router) {}

  getAllEmplois(query?: any): Observable<any> {
    return this.http.get(this.URL_F + '?', {
      headers: this._headers,
      params: query,
    });
  }
  addEmploi(data: any): Observable<any> {
    return this.http.post(this.URL_F, data, {
      headers: this._headers,
    });
  }
  getEmploiById(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  getEmploisProfesseurById(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/professeur`, {
      headers: this._headers,
    });
  }

  deleteEmploi(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }
  updateEmploi(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}`, data, {
      headers: this._headers,
    });
  }
}
