import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginApiActions, LoginPageActions } from './actions';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {

  constructor(private readonly actions$: Actions,
    private readonly authService: AuthService) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.login),
      switchMap(action => {
        return this.authService.login(action.login, action.password).pipe(
          map(tokenResponse => LoginApiActions.loginSuccess({ token: tokenResponse.token })),
          catchError(error => of(LoginApiActions.loginFailure({ error })))
        );
      })
    );
  });
}
