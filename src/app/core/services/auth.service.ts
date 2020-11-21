import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = environment.api.login;

  constructor(private readonly http: HttpClient,
    private readonly jwtHelperService: JwtHelperService) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'user/login', {
      login,
      password
    }, {
      observe: 'response'
    });
  }

  isTokenValid(token: string): boolean {
    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  decodeToken(token): any {
    return this.jwtHelperService.decodeToken(token);
  }
}
