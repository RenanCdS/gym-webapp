import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';

export const getMyAthletes = createAction(
  '[Coach] Get My Athletes'
);

export const deleteAthlete = createAction(
  '[Coach] Delete Athlete',
  props<{ athlete: Athlete }>()
);
