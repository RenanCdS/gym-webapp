import { createAction, props } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../../models/api/exercise';

export const loadExercises = createAction(
  '[Athlete] Load Exercise',
  props<{ trainingType: TrainingTypeEnum }>()
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
