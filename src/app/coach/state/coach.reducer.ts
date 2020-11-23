import { Statement } from '@angular/compiler';
import { createReducer, on } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { AppPageActions } from 'src/app/state/actions';
import { Coach } from '../models/coach';
import { CoachApiActions, CoachPageActions } from './actions';

export interface CoachState {
  myAthletes: Athlete[];
  coaches: Coach[];
  error: string;
  isRegistration: boolean;
  coachToUpdate: Coach;
}

const initialState: CoachState = {
  myAthletes: [],
  coaches: [],
  error: '',
  coachToUpdate: null,
  isRegistration: true
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
  }),
  on(CoachApiActions.getCoachesSuccess, (state, action) => {
    return {
      ...state,
      coaches: action.coaches
    };
  }),
  on(CoachApiActions.getCoachesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(CoachPageActions.cadasterCoach, (state) => {
    return {
      ...state,
      isRegistration: true,
      coachToUpdate: null
    };
  }),
  on(CoachPageActions.updateCoachFlag, (state, action) => {
    return {
      ...state,
      isRegistration: false,
      coachToUpdate: action.coach
    };
  }),
  on(CoachApiActions.updateCoachSuccess, (state, action) => {
    return {
      ...state,
      coaches: state.coaches.map(coach => {
        if (coach.email === action.coach.email) {
          return action.coach;
        }
        return coach;
      })
    };
  }),
  on(CoachApiActions.deleteCoachSuccess, (state, action) => {
    return {
      ...state,
      coaches: state.coaches.filter(coach => coach.email !== action.coach.email)
    };
  }),
  on(AppPageActions.exit, state => {
    return initialState;
  }),
);
