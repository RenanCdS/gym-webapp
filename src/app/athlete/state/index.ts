import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/index';
import { AthleteState } from './athlete.reducer';

export interface State extends AppState.State {
  athlete: AthleteState;
}

export const athleteSelector = createFeatureSelector<AthleteState>('athlete');

export const getExercises = createSelector(
  athleteSelector,
  state => state.exercises
);

export const getMyTrainingFailure = createSelector(
  athleteSelector,
  state => state.error
);

export const getIsFinished = createSelector(
  athleteSelector,
  state => state.isFinished
);

export const getIsStarted = createSelector(
  athleteSelector,
  state => state.isStarted
);

export const getTrainingId = createSelector(
  athleteSelector,
  state => state.trainingId
);
