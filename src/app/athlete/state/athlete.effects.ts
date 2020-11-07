import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/services/utils.service';
import { athleteSelector, getTrainingId, State } from '.';
import { TrainingStatusResponse } from '../models/api/my-training-response';
import { ChangeWeightRequest } from '../models/api/my-training/change-weight-request';
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
    private readonly utilsService: UtilsService,
    private readonly snackBar: MatSnackBar) {
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

  startTraining$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.startTraining),
      tap(() => {
        this.utilsService.startLoading();
      }),
      switchMap(action => {
        return this.athleteService.startTraining(action.trainingType).pipe(
          map(startedTraining => AthleteApiActions.startTrainingSuccess({ startedTraining })),
          catchError(error => {
            this.utilsService.finishLoading();
            return of(AthleteApiActions.startTrainingFailure({ error }));
          })
        );
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
          map(() => AthleteApiActions.finalizeTrainingSuccess(null)),
          catchError(error => {
            return of(AthleteApiActions.finalizeTrainingFailure({ error }));
          })
        );
      }),
    );
  });

  changeExerciseWeight$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.changeExerciseWeight),
      withLatestFrom(this.store.select(getTrainingId)),
      switchMap(([action, trainingId]) => {
        const changeWeightRequest: ChangeWeightRequest = {
          currentWeight: action.currentWeight,
          exerciseId: action.exercise.exerciseId,
          trainingId
        };
        return this.athleteService.changeExerciseWeight(changeWeightRequest).pipe(
          map(changeWeightResponse => AthleteApiActions.changeWeightSuccess(changeWeightResponse)),
          tap(() => this.snackBar.open('Peso alterado com sucesso ;)', '', {
            duration: 2000
          })),
          catchError(error => {
            return of(AthleteApiActions.changeWeightFailure({ error }));
          })
        );
      })
    );
  })
}
