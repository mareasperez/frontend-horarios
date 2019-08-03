import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    return this.httpClient.post<{ access_token: string }>('http://localhost:8000/api/auth/', { username, password }).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
