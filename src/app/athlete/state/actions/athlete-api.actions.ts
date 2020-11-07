import { createAction, props } from '@ngrx/store';
import { TrainingStatusResponse } from '../../models/api/my-training-response';

export const verifyTrainingStatusSuccess = createAction(
  '[Athlete] Load Training Success',
  props<{ myTrainingResponse: TrainingStatusResponse }>()
);

export const verifyTrainingStatusFailure = createAction(
  '[Athlete] Load Training Failure',
  props<{ error: string }>()
);
