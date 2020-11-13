import { createAction, props } from '@ngrx/store';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';

export const loginSuccess = createAction(
  '[App] Login Success',
  props<{ token: string, userRole: UserRoleEnum }>()
);

export const loginFailure = createAction(
  '[App] Login Failure',
  props<{ error: string }>()
);

export const userRoleSuccess = createAction(
  '[App] Identify User Role Success',
  props<{ userRole: UserRoleEnum }>()
);
