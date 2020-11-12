import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private readonly BASE_URL = environment.api.gym;
  constructor(private http: HttpClient) { }

  getMyAthletes(): Observable<any> {
    return this.http.get(`${this.BASE_URL}my-athletes`);
  }
}
