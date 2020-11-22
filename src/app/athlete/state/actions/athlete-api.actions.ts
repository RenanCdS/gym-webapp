import { createAction, props } from '@ngrx/store';
import { TrainingStatusResponse } from '../../models/api/my-training-response';
import { ChangeWeightResponse } from '../../models/api/my-training/change-weight-response';
import { StartTrainingResponse } from '../../models/api/my-training/start-training-response';

export const verifyTrainingStatusSuccess = createAction(
  '[Athlete] Load Training Success',
  props<{ myTrainingResponse: TrainingStatusResponse }>()
);

export const verifyTrainingStatusFailure = createAction(
  '[Athlete] Load Training Failure',
  props<{ error: string }>()
);

export const finalizeTrainingSuccess = createAction(
  '[Athlete] Finalize Training Success',
  props()
);

export const finalizeTrainingFailure = createAction(
  '[Athlete] Finalize Training Failure',
  props<{ error: string }>()
);

export const startTrainingSuccess = createAction(
  '[Athlete] Start Training Success',
  props<{ startedTraining: StartTrainingResponse }>()
);

export const startTrainingFailure = createAction(
  '[Athlete] Start Training Failure',
  props<{ error }>()
);

export const changeWeightSuccess = createAction(
  '[Athlete] Change Weight Success',
  props<ChangeWeightResponse>()
);

export const changeWeightFailure = createAction(
  '[Athlete] Change Weight Failure',
  props<{ error }>()
);

export const registerAthleteSuccess = createAction(
  '[Athlete] Register Athlete Success'
);

export const registerAthleteFailure = createAction(
  '[Athlete] Register Athlete Failure',
  props<{ error }>()
);

export const updateAthleteSuccess = createAction(
  '[Athlete] Update Athlete Success'
);

export const updateAthleteFailure = createAction(
  '[Athlete] Update Athlete Failure',
  props<{ error }>()
);
