import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMyAthleteResponse } from '../models/api/get-my-athletes-response';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private readonly BASE_URL = environment.api.gym;
  constructor(private http: HttpClient) { }

  getMyAthletes(): Observable<GetMyAthleteResponse> {
    return this.http.get<GetMyAthleteResponse>(`${this.BASE_URL}my-athletes`);
  }

  deleteAthlete(athleteEmail: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}my-athletes?email=${athleteEmail}`);
  }
}
