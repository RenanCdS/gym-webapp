import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/index';
import { AthleteState } from './athlete.reducer';

export interface State extends AppState.State {
  athlete: AthleteState;
}

export const athleteSelector = createFeatureSelector<AthleteState>('athlete');

export const getMyTrainingSuccess = createSelector(
  athleteSelector,
  state => state.myTrainingResponse
);

export const getExercises = createSelector(
  athleteSelector,
  state => state.exercises
);

export const getMyTrainingFailure = createSelector(
  athleteSelector,
  state => state.error
);
