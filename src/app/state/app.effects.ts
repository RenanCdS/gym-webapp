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
import { ExerciseService } from '../core/services/exercise.service';
import { Store } from '@ngrx/store';
import { State } from '.';
import { AppPage } from 'e2e/src/app.po';
import { UtilsService } from '../core/services/utils.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { env } from 'process';

@Injectable()
export class AppEffects {

  private readonly ERROR_MESSAGES = new Map([
    [400, 'E-mail ou senha incorretos'],
    [401, 'E-mail ou senha incorretos'],
    [403, 'E-mail ou senha incorretos'],
    [500, 'Ocorreu um erro no sistema :('],
  ]);

  constructor(private readonly actions$: Actions,
    private readonly store: Store<State>,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private readonly snackBar: MatSnackBar,
    private readonly exerciseService: ExerciseService,
    private readonly utilsService: UtilsService,
    private readonly router: Router
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.login),
      switchMap(action => {
        return this.authService.login(action.login, action.password).pipe(
          tap((tokenResponse: HttpResponse<any>) => {
            let token = '';
            if (!environment.validateToken) {
              token = tokenResponse.body.token;
            } else {
              token = tokenResponse.headers.get('Authorization')?.replace('Bearer ', '');
            }
            if (!token) {
              this.snackBar.open('Ocorreu um erro no login :(', '', {
                duration: 2000
              });
              return;
            }
            this.sessionService.setStorage(ACCESS_TOKEN_KEY, token);
            this.snackBar.open('Logado com sucesso ;)', '', {
              duration: 2000,
              verticalPosition: 'bottom'
            });
          }),
          map(tokenResponse => {
            const token = tokenResponse.headers.get('Authorization');
            this.store.dispatch(AppPageActions.getRegisteredExercises());
            if (!environment.validateToken) {
              return AppApiActions.loginSuccess({ token, userRole: UserRoleEnum.STAFF });
            }
            const userRole = this.authService.decodeToken(token).scopes;
            this.router.navigate(['/home']);

            return AppApiActions.loginSuccess({ token, userRole });
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
            return of(AppApiActions.loginFailure({ error }));
          })
        );
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

  showError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.showError),
      tap(action => {
        this.utilsService.showMessage(action.error);
      })
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

  getRegisterExercises$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageActions.getRegisteredExercises),
      switchMap(() => {
        return this.exerciseService.getRegisteredExercises().pipe(
          map(exercisesResponse => {
            return exercisesResponse;
          }),
          map(registeredExercises => {
            return AppApiActions.getRegisteredExercisesSuccess({ registeredExercises });
          }),
          catchError(error => {
            this.router.navigate(['/erro']);
            return of(AppApiActions.getRegisteredExercisesFailure({ error }));
          })
        );
      })
    );
  });
}
