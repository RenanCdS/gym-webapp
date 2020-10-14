import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = environment.api.login;

  constructor(private readonly http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'auth/login', {
      login,
      password
    });
  }
}
