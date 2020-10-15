import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './app.reducer';

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
