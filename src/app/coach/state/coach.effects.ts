import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/services/utils.service';
import { State } from 'src/app/state';
import { AppPageActions } from 'src/app/state/actions';
import { CoachService } from '../services/coach.service';
import { CoachApiActions, CoachPageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class CoachEffects {

  constructor(private readonly coachService: CoachService,
    private readonly actions$: Actions,
    private readonly utilsService: UtilsService,
    private readonly store: Store<State>,
    private readonly router: Router) {
  }

  getMyAthletes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoachPageActions.getMyAthletes),
      switchMap(() => {
        return this.coachService.getMyAthletes().pipe(
          map(myAthletesResponse => {
            return CoachApiActions.getMyAthletesSuccess(myAthletesResponse);
          }),
          catchError(error => {
            this.router.navigate(['/erro']);
            return of(CoachApiActions.getMyAthletesFailure({ error }));
          })
        );
      })
    );
  });

  deleteAthlete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoachPageActions.deleteAthlete),
      switchMap(action => {
        this.store.dispatch(AppPageActions.startLoading());
        return this.coachService.deleteAthlete(action.athlete.email).pipe(
          map(() => {
            this.utilsService.showMessage('Atleta deletado com sucesso ;)');
            return CoachApiActions.deleteAthleteSuccess({ athlete: action.athlete });
          }),
          catchError(error => {
            this.utilsService.showMessage('Ocorreu um erro, por favor tente novamente');
            return of(CoachApiActions.deleteAthleteFailure({ error }));
          })
        );
      }),
      tap(() => {
        this.store.dispatch(AppPageActions.finishLoading());
      })
    );
  });
}
