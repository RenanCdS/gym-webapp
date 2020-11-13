import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRoleEnum } from '../core/enums/user-role.enum';
import { Athlete } from '../core/models/Athlete';

export interface State {
  login: string;
  token: string;
  error: string;
  userRole: UserRoleEnum;
  loading: boolean;
  isRegistration: boolean;
  athleteToUpdate: Athlete;
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
    isRegistration: state.isRegistration,
    athleteToUpdate: state.athleteToUpdate
  })
);
