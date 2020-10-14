import { createAction, props } from '@ngrx/store';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ token: string, userRole: UserRoleEnum }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: string }>()
);
