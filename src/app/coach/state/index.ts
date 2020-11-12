import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/index';
import { CoachState } from './coach.reducer';

export interface State extends AppState.State {
  coach: CoachState;
}

export const coachSelector = createFeatureSelector<CoachState>('coach');

export const getMyAthletes = createSelector(
  coachSelector,
  state => state.myAthletes
);
