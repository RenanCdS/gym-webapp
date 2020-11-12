import { createReducer, on } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { CoachApiActions, CoachPageActions } from './actions';

export interface CoachState {
  myAthletes: Athlete[];
}

const initialState: CoachState = {
  myAthletes: []
};

export const coachReducer = createReducer<CoachState>(
  initialState,
  on(CoachApiActions.getMyAthletesSuccess, (state, action) => {
    return {
      ...state,
      myAthletes: action.athletes
    };
  })
);
