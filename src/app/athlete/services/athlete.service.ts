import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { environment } from 'src/environments/environment';
import { TrainingStatusResponse } from '../models/api/my-training-response';
import { ChangeWeightRequest } from '../models/api/my-training/change-weight-request';
import { ChangeWeightResponse } from '../models/api/my-training/change-weight-response';
import { SendTrainingRequest } from '../models/api/my-training/send-training-request';
import { StartTrainingResponse } from '../models/api/my-training/start-training-response';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private readonly BASE_URL = environment.api.gym;

  constructor(private readonly http: HttpClient) { }

  getTrainingStatus(): Observable<TrainingStatusResponse> {
    return this.http.get<TrainingStatusResponse>(`${this.BASE_URL}my-training`);
  }

  getTrainingStartedVerification(): Observable<any> {
    return null;
  }

  sendDailyTraining(sendTrainingRequest: SendTrainingRequest): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}my-training`, sendTrainingRequest);
  }

  changeExerciseWeight(changeWeightRequest: ChangeWeightRequest): Observable<ChangeWeightResponse> {
    return this.http.put<ChangeWeightResponse>(`${this.BASE_URL}my-training`, changeWeightRequest);
  }

  startTraining(trainingType: TrainingTypeEnum): Observable<StartTrainingResponse> {
    return this.http.get<StartTrainingResponse>(`${this.BASE_URL}my-training/start/${trainingType}`);
  }
}
