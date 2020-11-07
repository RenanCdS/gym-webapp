import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../models/api/exercise';

// action que verifica se o treino já foi iniciado
export const verifyTrainingStatus = createAction(
  '[Athlete] Verify Training Status'
);

export const jumpExercise = createAction(
  '[Athlete] Jump Exercise',
  props<{ exercise: Exercise }>()
);

export const finalizeTraining = createAction(
  '[Athlete] Finalize Training',
  props<{ isFinished: boolean, dailyTrainingId: number }>()
);

export const finalizeTrainingSuccess = createAction(
  '[Athlete] Finalize Training Success',
  props()
);

export const finalizeTrainingFailure = createAction(
  '[Athlete] Finalize Training Failure',
  props<{ error: string }>()
);

export const changeExerciseWeight = createAction(
  '[Athlete] Change Exercise Weight',
  props<{ currentWeight: number }>()
);
