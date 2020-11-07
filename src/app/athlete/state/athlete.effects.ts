import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/services/utils.service';
import { athleteSelector, State } from '.';
import { TrainingStatusResponse } from '../models/api/my-training-response';
import { ExerciseStatus } from '../models/api/my-training/send-training-request';
import { AthleteService } from '../services/athlete.service';
import { AthleteApiActions, AthletePageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class AthleteEffects {

  constructor(private readonly actions$: Actions,
    private readonly store: Store<State>,
    private readonly athleteService: AthleteService,
    private readonly utilsService: UtilsService) {
  }

  verifyTrainingStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.verifyTrainingStatus),
      tap(() => {
        this.utilsService.startLoading();
      }),
      switchMap(() => {
        return this.athleteService.getTrainingStatus();
      }),
      map((response: TrainingStatusResponse) => {
        return AthleteApiActions.verifyTrainingStatusSuccess({ myTrainingResponse: response });
      }),
      tap(() => {
        this.utilsService.finishLoading();
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

  // changeExerciseWeight$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AthletePageActions.changeExerciseWeight),
  //     switchMap()
  //   )
  // })
}
