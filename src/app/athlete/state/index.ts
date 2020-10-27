import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/index';
import { AthleteState } from './athlete.reducer';

export interface State extends AppState.State {
  athlete: AthleteState;
}

const athleteSelector = createFeatureSelector<State>('athlete');

export const getMyTrainingSuccess = createSelector(
  athleteSelector,
  state => state.athlete.myTrainingResponse
);

export const getMyTrainingFAilure = createSelector(
  athleteSelector,
  state => state.error
);
