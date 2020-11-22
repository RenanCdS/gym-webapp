import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { PostCadasterCoachRequest } from '../../models/api/post-cadaster-coach-request';
import { Coach } from '../../models/coach';

export const getMyAthletes = createAction(
  '[Coach] Get My Athletes'
);

export const deleteAthlete = createAction(
  '[Coach] Delete Athlete',
  props<{ athlete: Athlete }>()
);

export const cadasterCoach = createAction(
  '[Coach] Cadaster Coach',
  props<{ coach: PostCadasterCoachRequest, callback: any }>()
);

export const updateCoach = createAction(
  '[Coach] Update Coach',
  props<{ coach: Partial<Coach>, callback: any }>()
);

export const getCoaches = createAction(
  '[Coach] Get Coaches'
);

export const updateCoachFlag = createAction(
  '[Coach] Update Coach Flag',
  props<{ coach: Coach }>()
);

export const cadasterCoachFlag = createAction(
  '[Coach] Cadaster Coach Flag'
);

export const deleteCoach = createAction(
  '[Coach] Delete Coach',
  props<{ coach: Coach }>()
);
