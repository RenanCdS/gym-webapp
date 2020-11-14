import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetRegisteredExercisesResponse } from '../models/api/get-registered-exercises';
import { RegisteredExercise } from '../models/RegisteredExercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private readonly http: HttpClient) { }

  getRegisteredExercises(): Observable<GetRegisteredExercisesResponse> {
    return this.http.get<GetRegisteredExercisesResponse>(`${environment.api.gym}exercises`);
  }
}
