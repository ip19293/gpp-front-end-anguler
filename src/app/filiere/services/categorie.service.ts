import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getAllCategories(): Observable<any> {
    return this.http.get('http://localhost:5000/categorie', {
      headers: this._headers,
    });
  }

  addCategorie(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/categorie', data);
  }
  getCategorieById(id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/categorie/${id}`);
  }
  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/categorie/${id}`, {
      headers: this._headers,
    });
  }
  updateCategorie(id: string, data: any): Observable<any> {
    return this.http.patch(`http://localhost:5000/categorie/${id}`, data, {
      headers: this._headers,
    });
  }
  getCategorieMatieres(id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/categorie/${id}/matieres`);
  }
}
