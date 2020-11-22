import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRoleEnum } from '../core/enums/user-role.enum';
import { Athlete } from '../core/models/Athlete';
import { RegisteredExercise } from '../core/models/RegisteredExercise';

export interface State {
  login: string;
  token: string;
  error: string;
  userRole: UserRoleEnum;
  loading: boolean;
  isExerciseRegistration: boolean;
  exerciseToUpdate: RegisteredExercise;
  isAthleteRegistration: boolean;
  athleteToUpdate: Athlete;
  availableExercises: RegisteredExercise[]; // exercises registered in the database
}

const rootSelector = createFeatureSelector<State>('login');

export const getToken = createSelector(
  rootSelector,
  state => state.token
);

export const getLoginError = createSelector(
  rootSelector,
  state => state.error
);

export const getUserRole = createSelector(
  rootSelector,
  state => state.userRole
);

export const getLoading = createSelector(
  rootSelector,
  state => state.loading
);

export const getIsRegistration = createSelector(
  rootSelector,
  state => ({
    isRegistration: state.isAthleteRegistration,
    athleteToUpdate: state.athleteToUpdate
  })
);

export const getIsExerciseRegistration = createSelector(
  rootSelector,
  state => ({
    isRegistration: state.isExerciseRegistration,
    exerciseToUpdate: state.exerciseToUpdate
  })
);

export const getAvailableExercises = createSelector(
  rootSelector,
  state => state.availableExercises
);
