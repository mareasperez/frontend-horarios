import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Api } from '../models/api.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    return this.httpClient.post<{ token: string }>(environment.API_Auth, { username, password }).pipe(tap(res => {
      console.log(res.token);
      localStorage.setItem('access', String(res.token));
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
  public get Token(): string {
    return localStorage.getItem('access');
  }
  tokenVerify(): Observable<any> {
    const body = { token: this.Token };
    const head = {};
    head['Content-Type'] = 'application/json';
    return this.httpClient.post(environment.Api_Auth_Verify, body, head);
  }
}
