import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { PostCadasterCoachRequest } from '../../models/api/post-cadaster-coach-request';

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
