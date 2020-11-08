import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
    private readonly snackBar: MatSnackBar,
    private readonly router: Router) {
  }

  /**
   * @description effect que verifica se o usuário já comeou um treino ou se ele já finalizou 
   */
  verifyTrainingStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AthletePageActions.verifyTrainingStatus),
      tap(() => {
        this.utilsService.startLoading();
      }),
      withLatestFrom(this.store.select(athleteSelector)),
      switchMap(([action, athleteState]) => {
        let response$: Observable<any>;
        if (athleteState.isFinished === null || athleteState.isStarted === null) {
          response$ = this.athleteService.getTrainingStatus();
        } else {
          const statusResponse: TrainingStatusResponse = {
            dailyTrainingId: athleteState.dailyTrainingId,
            exercises: athleteState.exercises,
            isFinished: athleteState.isFinished,
            isStarted: athleteState.isStarted,
            trainingId: athleteState.trainingId
          };
          response$ = of(statusResponse);
        }

        return response$.pipe(
          map((response: TrainingStatusResponse) => {
            this.athleteService.validateTrainingStatus(response.isFinished, response.isStarted);
            return AthleteApiActions.verifyTrainingStatusSuccess({ myTrainingResponse: response });
          }),
          catchError(error => {
            this.router.navigate(['/erro']);
            return of(AthleteApiActions.finalizeTrainingFailure({ error }));
          })
        );
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
          tap(() => {
            this.router.navigate(['/atleta/treino']);
          }),
          map(startedTraining => AthleteApiActions.startTrainingSuccess({ startedTraining })),
          catchError(error => {
            this.router.navigate(['/erro']);
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
      switchMap(([action, athleteState]) => {
        const exercisesStatus: ExerciseStatus[] = athleteState.exercises.map(exercise => (
          {
            exerciseId: exercise.exerciseId,
            completed: exercise.completed
          }));

        return this.athleteService.sendDailyTraining({
          dailyTrainingId: athleteState.dailyTrainingId,
          exercises: exercisesStatus,
          isFinished: action.isFinished
        }).pipe(
          tap(() => {
            this.router.navigate(['/atleta/finalizado']);
          }),
          map(() => AthleteApiActions.finalizeTrainingSuccess(null)),
          catchError(error => {
            this.router.navigate(['/erro']);
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
            this.utilsService.showError('Houve um erro no sistema :(');
            return of(AthleteApiActions.changeWeightFailure({ error }));
          })
        );
      })
    );
  });
}
