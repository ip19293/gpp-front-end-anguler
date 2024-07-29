import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getPaiements(query?: any): Observable<any> {
    return this.http.get('http://localhost:5000/paiement?', {
      headers: this._headers,
      params: query,
    });
  }
  Statistique(): Observable<any> {
    return this.http.get(`http://localhost:5000/paiement/statistique`, {
      headers: this._headers,
    });
  }
  ProfesseurStatistique(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/paiement/statistique/${id}`, {
      headers: this._headers,
    });
  }

  getPaiementById(id: any): Observable<any> {
    return this.http.get(`http://localhost:5000/paiement/${id}`, {
      headers: this._headers,
    });
  }
  getPaiementsByProfesserId(id: any, data?: any): Observable<any> {
    return this.http.post(
      `http://localhost:5000/paiement/${id}/professeur`,
      data,
      {
        headers: this._headers,
      }
    );
  }
  getPaiementInformation(data?: any): Observable<any> {
    return this.http.post(`http://localhost:5000/paiement/information`, data, {
      headers: this._headers,
    });
  }

  addPaiement(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/paiement', data, {
      headers: this._headers,
    });
  }
  addManyPaiements(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/paiement/many', data, {
      headers: this._headers,
    });
  }
  deletePaiemenet(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/paiement/${id}`, {
      headers: this._headers,
    });
  }
  confirmPaiement(id: string, data?: any): Observable<any> {
    return this.http.post(
      `http://localhost:5000/paiement/${id}/confirmation`,
      data,
      {
        headers: this._headers,
      }
    );
  }
  confirmation(): Observable<any> {
    return this.http.get(`http://localhost:5000/paiement/confirmation`, {
      headers: this._headers,
    });
  }
  updatePaiement(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/paiement/${id}`, data, {
      headers: this._headers,
    });
  }
}
