import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginApiActions, LoginPageActions } from './actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_KEY } from 'src/app/core/constants/constants';

@Injectable()
export class LoginEffects {

  private readonly ERROR_MESSAGES = new Map([
    [401, 'E-mail ou senha incorretos'],
    [403, 'E-mail ou senha incorretos'],
    [500, 'Ocorreu um erro no sistema :('],
  ]);

  constructor(private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.login),
      switchMap(action => {
        return this.authService.login(action.login, action.password).pipe(
          tap(tokenResponse => {
            const token = tokenResponse?.token;
            if (!token) {
              this.snackBar.open('Ocorreu um erro no login :(');
              return;
            }
            this.router.navigate(['/']);
            this.sessionService.setStorage(ACCESS_TOKEN_KEY, token);
            this.snackBar.open('Logado com sucesso ;)', '', {
              duration: 2000,
              verticalPosition: 'top'
            });
          }),
          map(tokenResponse => {
            const token = tokenResponse.token;
            const userRole = this.authService.decodeToken(token).role;
            return LoginApiActions.loginSuccess({ token, userRole });
          }),
          catchError(error => {
            let message = this.ERROR_MESSAGES.get(500);
            if (error && error.status) {
              message = this.ERROR_MESSAGES.get(error.status);
            }
            this.snackBar.open(message, '', {
              verticalPosition: 'top',
              duration: 2000
            });
            return of(LoginApiActions.loginFailure({ error }));
          })
        );
      })
    );
  });
}
