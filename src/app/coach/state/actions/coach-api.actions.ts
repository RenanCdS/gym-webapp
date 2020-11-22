import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { GetMyAthleteResponse } from '../../models/api/get-my-athletes-response';
import { Coach } from '../../models/coach';

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

export const getCoachesSuccess = createAction(
  '[Coach] Get Coaches Success',
  props<{ coaches: Coach[] }>()
);

export const getCoachesFailure = createAction(
  '[Coach] Get Coaches Failure',
  props<{ error: string }>()
);

export const updateCoachSuccess = createAction(
  '[Coach] Update Coach Success',
  props<{ coach: Coach }>()
);

export const updateCoachFailure = createAction(
  '[Coach] Update Coach Failure',
  props<{ error: string }>()
);

export const deleteCoachSuccess = createAction(
  '[Coach] Delete Coach Success',
  props<{ coach: Coach }>()
);

export const deleteCoachFailure = createAction(
  '[Coach] Delete Coach Failure',
  props<{ error: string }>()
);
