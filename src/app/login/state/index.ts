import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.reducer';

export const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getToken = createSelector(
  getLoginFeatureState,
  state => state.token
);

export const getLoginError = createSelector(
  getLoginFeatureState,
  state => state.error
);

export const getUserRole = createSelector(
  getLoginFeatureState,
  state => state.userRole
);
