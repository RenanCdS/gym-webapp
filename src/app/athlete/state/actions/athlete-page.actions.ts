import { createAction, props } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../../models/api/exercise';

// action que verifica se o treino já foi iniciado
export const verifyTrainingStatus = createAction(
  '[Athlete] Verify Training Status'
);

export const startTraining = createAction(
  '[Athlete] Start Training',
  props<{ trainingType: TrainingTypeEnum }>()
);

export const finalizeTraining = createAction(
  '[Athlete] Finalize Training',
  props<{ isFinished: boolean, dailyTrainingId: number }>()
);

export const changeExerciseWeight = createAction(
  '[Athlete] Change Exercise Weight',
  props<{ exercise: Exercise, currentWeight: number }>()
);

export const doneExercise = createAction(
  '[Athlete] Done Exercise',
  props<{ exercise: Exercise }>()
);

