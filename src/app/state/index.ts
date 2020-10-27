import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRoleEnum } from '../core/enums/user-role.enum';

export interface State {
  login: string;
  token: string;
  error: string;
  userRole: UserRoleEnum;
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
