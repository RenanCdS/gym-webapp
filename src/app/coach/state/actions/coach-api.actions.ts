import { createAction, props } from '@ngrx/store';
import { GetMyAthleteResponse } from '../../models/api/get-my-athletes-response';

export const getMyAthletesSuccess = createAction(
  '[Coach] Get My Athletes Success',
  props<GetMyAthleteResponse>()
);

export const getMyAthletesFailure = createAction(
  '[Coach] Get My Athletes Failure',
  props<{ error: string }>()
);
