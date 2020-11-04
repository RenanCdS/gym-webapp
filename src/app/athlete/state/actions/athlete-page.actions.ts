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
