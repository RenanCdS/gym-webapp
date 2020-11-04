import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { athleteSelector, getExercises, State } from '.';
import { MyTrainingResponse } from '../models/api/my-training-response';
import { ExerciseStatus } from '../models/api/my-training/send-training-request';
import { AthleteService } from '../services/athlete.service';
import { AthleteApiActions, AthletePageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class AthleteEffects {

  constructor(private readonly actions$: Actions,
    private readonly store: Store<State>,
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

  finalizeTraining$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.finalizeTraining),
      withLatestFrom(this.store.select(athleteSelector)),
      switchMap(([action, storeState]) => {
        const exercisesStatus: ExerciseStatus[] = storeState.exercises.map(exercise => (
          {
            exerciseId: exercise.exerciseId,
            completed: exercise.completed
          }));

        return this.athleteService.sendDailyTraining({
          dailyTrainingId: action.dailyTrainingId,
          exercises: exercisesStatus,
          isFinished: action.isFinished
        }).pipe(
          map(() => AthletePageActions.finalizeTrainingSuccess(null)),
          catchError(error => {
            return of(AthletePageActions.finalizeTrainingFailure({ error }));
          })
        );
      }),
    );
  });
}
