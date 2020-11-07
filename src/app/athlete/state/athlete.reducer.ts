import { createReducer, on } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../models/api/exercise';
import { AthleteApiActions, AthletePageActions } from './actions';

export interface AthleteState {
  exercises: Exercise[];
  currentTrainingType: TrainingTypeEnum;
  trainingId: number;
  dailyTrainingId: number;
  isStarted: boolean;
  isFinished: boolean;
  error: string;
  currentExercise: Exercise;
}

const initialState: AthleteState = {
  exercises: [],
  currentTrainingType: null,
  dailyTrainingId: null,
  isFinished: null,
  isStarted: null,
  trainingId: null,
  error: '',
  currentExercise: null
};

export const athleteReducer = createReducer<AthleteState>(
  initialState,
  on(AthleteApiActions.verifyTrainingStatusSuccess, (state, action) => {
    return {
      ...state,
      dailyTrainingId: action.myTrainingResponse.dailyTrainingId,
      isFinished: action.myTrainingResponse.isFinished,
      isStarted: action.myTrainingResponse.isStarted,
      exercises: action.myTrainingResponse.exercises,
      currentExercise: null
    };
  }),
  on(AthleteApiActions.verifyTrainingStatusFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AthleteApiActions.startTrainingSuccess, (state, action) => {
    return {
      ...state,
      exercises: action.startedTraining.exercises,
      trainingId: action.startedTraining.trainingId,
      dailyTrainingId: action.startedTraining.dailyTrainingId,
      isFinished: action.startedTraining.isFinished,
      isStarted: action.startedTraining.isStarted,
      currentTrainingType: action.startedTraining.trainingType
    };
  })
);
