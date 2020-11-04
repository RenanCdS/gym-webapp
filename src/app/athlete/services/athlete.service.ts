import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { environment } from 'src/environments/environment';
import { MyTrainingResponse } from '../models/api/my-training-response';
import { SendTrainingRequest } from '../models/api/my-training/send-training-request';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private readonly BASE_URL = environment.api.gym;

  constructor(private readonly http: HttpClient) { }

  getExercises(trainingType: TrainingTypeEnum): Observable<MyTrainingResponse> {
    return this.http.get<MyTrainingResponse>(`${this.BASE_URL}my-training?trainingType=${trainingType}`);
  }

  getTrainingStartedVerification(): Observable<any> {
    return null;
  }

  sendDailyTraining(sendTrainingRequest: SendTrainingRequest): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}my-training`, sendTrainingRequest);
  }
}
