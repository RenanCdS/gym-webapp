import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExerciseService } from 'src/app/core/services/exercise.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AppApiActions, AppPageActions } from 'src/app/state/actions';
import { registerExercise } from 'src/app/state/actions/app-page.actions';

@Injectable({
  providedIn: 'root'
})
export class ExerciseEffects {

  constructor(private readonly actions$: Actions,
    private readonly exerciseService: ExerciseService,
    private readonly utilsService: UtilsService) {
  }

  registerExercise$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerExercise),
      switchMap(action => {
        return this.exerciseService.registerExercise(action.exerciseData).pipe(
          map(exercise => {
            action.callback();
            this.utilsService.showMessage('Exercício cadastrado com sucesso ;)');
            return AppApiActions.registerExerciseSuccess({ exercise });
          }),
          catchError(error => {
            this.utilsService.showMessage('Ocorreu um erro ao cadastrar o exercício');
            return of(AppApiActions.registerExerciseFailure({ error }));
          })
        );
      })
    );
  });

  updateExercise$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.updateExerciseBack),
      switchMap(action => {
        return this.exerciseService.updateExercise(action.exerciseData, action.exerciseId).pipe(
          map(exercise => {
            action.callback();
            this.utilsService.showMessage('Exercício atualizado com sucesso ;)');
            return AppApiActions.updateExerciseBackSuccess({ exercise });
          }),
          catchError(error => {
            this.utilsService.showMessage('Ocorreu um erro ao editar o exercício');
            return of(AppApiActions.updateExerciseBackFailure({ error }));
          })
        );
      })
    )
  })
}
