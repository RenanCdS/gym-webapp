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
  availableExercises: null,
  exerciseToUpdate: null,
  isExerciseRegistration: true
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
  on(AppPageActions.exit, state => {
    return {
      ...state,
      error: '',
      login: '',
      token: '',
      userRole: null,
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
  }),
  on(AppApiActions.registerExerciseSuccess, (state, action) => {
    return {
      ...state,
      availableExercises: [...state.availableExercises, action.exercise]
    };
  }),
  on(AppApiActions.registerExerciseFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AppPageActions.registerExercise, state => {
    return {
      ...state,
      exerciseToUpdate: null,
      isExerciseRegistration: true
    };
  }),
  on(AppPageActions.updateExercise, (state, action) => {
    return {
      ...state,
      exerciseToUpdate: action.exerciseToUpdate,
      isExerciseRegistration: false
    };
  }),
  on(AppApiActions.updateExerciseBackSuccess, (state, action) => {
    return {
      ...state,
      availableExercises: state.availableExercises.map(exercise => {
        if (exercise.exerciseId === action.exercise.exerciseId) {
          return action.exercise;
        }
        return exercise;
      })
    };
  })
);
