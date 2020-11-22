import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/athlete/models/api/exercise';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { RegisteredExercise } from 'src/app/core/models/RegisteredExercise';
import { registerExercise } from './app-page.actions';

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

export const getRegisteredExercisesSuccess = createAction(
  '[App] Get Registered Exercises Success',
  props<{ registeredExercises: RegisteredExercise[] }>()
);

export const getRegisteredExercisesFailure = createAction(
  '[App] Get Registered Exercises Failure',
  props<{ error: string }>()
);

export const registerExerciseSuccess = createAction(
  '[App] Register Exercise Success',
  props<{ exercise: RegisteredExercise }>()
);

export const registerExerciseFailure = createAction(
  '[App] Register Exercise Failure',
  props<{ error: string }>()
);

export const updateExerciseBackSuccess = createAction(
  '[App] Update Exercise Back Success',
  props<{ exercise: RegisteredExercise }>()
);

export const updateExerciseBackFailure = createAction(
  '[App] Update Exercise Back Success',
  props<{ error: string }>()
);
