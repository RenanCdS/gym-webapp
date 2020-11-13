import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppApiActions, AppPageActions } from './actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_KEY } from 'src/app/core/constants/constants';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';

@Injectable()
export class AppEffects {

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
      ofType(AppPageActions.login),
      switchMap(action => {
        this.router.navigate(['/home']);
        return of(AppApiActions.loginSuccess({ token: 'token', userRole: UserRoleEnum.STAFF }));
      })
    );
  });

  exit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.exit),
      tap(() => this.sessionService.clearLocalStorage()),
      tap(() => this.router.navigate(['/login'])),
      map(() => AppPageActions.empty())
    );
  });

  identifyUserRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.indetifyUserRole),
      map(() => {
        const token = this.authService.decodeToken(this.sessionService.getAuthToken());
        let userRole = UserRoleEnum.STUDENT;
        if (token) {
          userRole = token.role;
        }

        return AppApiActions.userRoleSuccess({ userRole });
      })
    );
  });
}
