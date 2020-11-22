import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetMyAthleteResponse } from '../models/api/get-my-athletes-response';
import { PostCadasterCoachRequest } from '../models/api/post-cadaster-coach-request';
import { Coach } from '../models/coach';

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

  postCadasterCoach(cadasterCoachRequest: PostCadasterCoachRequest): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}teachers`, cadasterCoachRequest);
  }

  getCoaches(): Observable<{ teachers: Coach[] }> {
    return this.http.get<{ teachers: Coach[] }>(`${this.BASE_URL}teachers`);
  }

  updateCoach(coach: Partial<Coach>): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}teachers`, coach);
  }

  deleteCoach(coach: Coach): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}teachers/${coach.id}`);
  }
}
