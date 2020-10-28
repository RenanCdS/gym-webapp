import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { MyTrainingResponse } from '../models/api/my-training-response';
import { AthleteService } from '../services/athlete.service';
import { AthleteApiActions, AthletePageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class AthleteEffects {

  constructor(private readonly actions$: Actions,
    private readonly athleteService: AthleteService) {
  }

  loadExercises$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.loadExercises),
      switchMap(actions => {
        return this.athleteService.getExercises(actions.trainingType);
      }),
      map((response: MyTrainingResponse) => {
        return AthleteApiActions.loadExerciseSuccess({ myTrainingResponse: response });
      })
    );
  });
}
