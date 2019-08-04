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
    return this.httpClient.post<{ access: string }>('http://localhost:8000/api/auth/', { username, password }).pipe(tap(res => {
      console.log(res.access);
      localStorage.setItem('access', String(res.access));
    }));
  }

  logout() {
    localStorage.removeItem('access');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access') !== null;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
