import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CoachService } from '../services/coach.service';
import { CoachApiActions, CoachPageActions } from './actions';

@Injectable({
  providedIn: 'root'
})
export class CoachEffects {

  constructor(private readonly coachService: CoachService,
    private readonly actions$: Actions) {
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
            return of(CoachApiActions.getMyAthletesFailure({ error }));
          })
        );
      })
    );
  });
}
