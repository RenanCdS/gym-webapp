import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { GetMyAthleteResponse } from '../../models/api/get-my-athletes-response';

export const getMyAthletesSuccess = createAction(
  '[Coach] Get My Athletes Success',
  props<GetMyAthleteResponse>()
);

export const getMyAthletesFailure = createAction(
  '[Coach] Get My Athletes Failure',
  props<{ error: string }>()
);

export const deleteAthleteSuccess = createAction(
  '[Coach] Delete Athlete Success',
  props<{ athlete: Athlete }>()
);

export const deleteAthleteFailure = createAction(
  '[Coach] Delete Athlete Failure',
  props<{ error: string }>()
);

export const cadasterCoachSuccess = createAction(
  '[Coach] Cadaster Coach Success'
);

export const cadasterCoachFailure = createAction(
  '[Coach] Cadaster Coach Failure',
  props<{ error: string }>()
);


