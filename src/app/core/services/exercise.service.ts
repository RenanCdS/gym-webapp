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

  getRegisteredExercises(): Observable<RegisteredExercise[]> {
    return this.http.get<RegisteredExercise[]>(`${environment.api.gym}exercises`);
  }

  registerExercise(exerciseData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.api.gym}exercises`, exerciseData);
  }

  updateExercise(exerciseData: FormData, exerciseId: number): Observable<any> {
    return this.http.put<any>(`${environment.api.gym}exercises/${exerciseId}`, exerciseData);
  }
}
