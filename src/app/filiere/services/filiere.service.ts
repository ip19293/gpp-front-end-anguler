import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  URL_F = 'http://localhost:5000/filiere';
  constructor(private http: HttpClient, private router: Router) {}

  getAllFillieres(query?: any): Observable<any> {
    return this.http.get('http://localhost:5000/filiere?', {
      headers: this._headers,
      params: query,
    });
  }
  addFilliere(data: any): Observable<any> {
    return this.http.post(this.URL_F, data, {
      headers: this._headers,
    });
  }
  getFilliereById(id: string, query?: any): Observable<any> {
    return this.http.get(this.URL_F + `/${id}`, {
      params: query,
    });
  }
  getFilliereEmplois(id: string, query?: any): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/emplois?`, {
      params: query,
    });
  }
  getEmploisByFiliereId(id: string): Observable<any> {
    return this.http.get(this.URL_F + `/${id}/emplois`, {
      headers: this._headers,
    });
  }
  deletePlan(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}/plans/${id}`, {
      headers: this._headers,
    });
  }
  deleteFilliere(id: string): Observable<any> {
    return this.http.delete(this.URL_F + `/${id}`, {
      headers: this._headers,
    });
  }

  updateFilliere(id: string, data: any): Observable<any> {
    return this.http.patch(this.URL_F + `/${id}`, data, {
      headers: this._headers,
    });
  }
}
