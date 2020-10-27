import { createAction, props } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';

export const loadExercises = createAction(
  '[Athlete] Load Exercise',
  props<{ trainingType: TrainingTypeEnum }>()
);
