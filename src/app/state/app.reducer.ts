import { createReducer, on } from '@ngrx/store';
import { State } from './index';
import { AppApiActions, AppPageActions } from './actions';

const initialState: State = {
  error: '',
  login: '',
  token: '',
  userRole: null,
  loading: false,
  athleteToUpdate: null,
  isAthleteRegistration: true,
  availableExercises: []
};

export const appReducer = createReducer<State>(
  initialState,
  on(AppApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      userRole: action.userRole,
      error: ''
    };
  }),
  on(AppApiActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AppApiActions.userRoleSuccess, (state, action) => {
    return {
      ...state,
      userRole: action.userRole
    };
  }),
  on(AppPageActions.exit, state => {
    return {
      ...state,
      error: '',
      login: '',
      token: '',
      userRole: null
    };
  }),
  on(AppPageActions.startLoading, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(AppPageActions.finishLoading, state => {
    return {
      ...state,
      loading: false
    };
  }),
  on(AppPageActions.updateAthlete, (state, action) => {
    return {
      ...state,
      isAthleteRegistration: false,
      athleteToUpdate: action.athlete
    };
  }),
  on(AppPageActions.createAthlete, (state) => {
    return {
      ...state,
      isAthleteRegistration: true,
      athleteToUpdate: null
    };
  }),
  on(AppApiActions.getRegisteredExercisesSuccess, (state, action) => {
    return {
      ...state,
      availableExercises: action.registeredExercises
    };
  }),
  on(AppApiActions.getRegisteredExercisesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);
