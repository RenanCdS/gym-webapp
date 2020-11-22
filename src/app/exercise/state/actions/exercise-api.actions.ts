import { createAction, props } from '@ngrx/store';

export const registerExerciseSuccess = createAction(
  '[Exercise] Register Exercise Success'
);

export const registerExerciseFailure = createAction(
  '[Exercise] Register Exercise Failure',
  props<{ error: string }>()
);
