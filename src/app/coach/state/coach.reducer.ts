import { createReducer, on } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { CoachApiActions, CoachPageActions } from './actions';

export interface CoachState {
  myAthletes: Athlete[];
  error: string;
}

const initialState: CoachState = {
  myAthletes: [],
  error: ''
};

export const coachReducer = createReducer<CoachState>(
  initialState,
  on(CoachApiActions.getMyAthletesSuccess, (state, action) => {
    return {
      ...state,
      myAthletes: action.athletes
    };
  }),
  on(CoachApiActions.deleteAthleteSuccess, (state, action) => {
    return {
      ...state,
      myAthletes: state.myAthletes.filter(athlete => athlete.email !== action.athlete.email)
    };
  }),
  on(CoachApiActions.deleteAthleteFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(CoachApiActions.cadasterCoachSuccess, (state, action) => {
    return {
      ...state,
      error: ''
    };
  }),
  on(CoachApiActions.cadasterCoachFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);
