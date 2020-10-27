import { createAction, props } from '@ngrx/store';
import { MyTrainingResponse } from '../../models/api/my-training-response';

export const loadExerciseSuccess = createAction(
  '[Athlete] Load Exercise Success',
  props<{ myTrainingResponse: MyTrainingResponse }>()
);

export const loadExerciseFailure = createAction(
  '[Athlete] Load Exercise Failure',
  props<{ error: string }>()
);
