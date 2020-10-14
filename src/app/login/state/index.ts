import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { LoginState } from './login.reducer';

export const getLoginFeatureState = createFeatureSelector<LoginState>('login');

export const getToken = createSelector(
  getLoginFeatureState,
  state => state.token
);
