import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParametreService {
  private _headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  constructor(private http: HttpClient) {}

  getAppSettings(): Observable<any> {
    return this.http.get('http://localhost:5000/settings', {
      headers: this._headers,
    });
  }
  updateAppSettings(): Observable<any> {
    return this.http.put(`http://localhost:5000/settings`, {
      headers: this._headers,
    });
  }
}
