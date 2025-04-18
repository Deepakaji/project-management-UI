import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7218/api/Login';

  constructor(private http: HttpClient) { }

  proceedLogin(userEmail: string, userPass: string): Observable<any> {
    const params = new HttpParams()
      .set('userEmail', userEmail)
      .set('userPass', userPass);

    return this.http.post(this.apiUrl, null, { params });
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  getUserRole(): string {
    var vloginoke = localStorage.getItem('token') || '';
    if (!vloginoke) return '';

    try {
      const tokenParts = vloginoke.split('.');
      const payload = atob(tokenParts[1]);
      const user = JSON.parse(payload);
      return user.role || '';
    } catch (error) {
      return '';
    }
  }

}
