import { createReducer, on } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Exercise } from '../models/api/exercise';
import { MyTrainingResponse } from '../models/api/my-training-response';
import { AthleteApiActions, AthletePageActions } from './actions';

export interface AthleteState {
  exercises: Exercise[];
  currentTrainingType: TrainingTypeEnum;
  myTrainingResponse: MyTrainingResponse;
  error: string;
  currentExercise: Exercise;
}

const initialState: AthleteState = {
  exercises: [],
  currentTrainingType: TrainingTypeEnum.A,
  myTrainingResponse: null,
  error: '',
  currentExercise: null
};

export const athleteReducer = createReducer<AthleteState>(
  initialState,
  on(AthleteApiActions.loadExerciseSuccess, (state, action) => {
    return {
      ...state,
      myTrainingResponse: action?.myTrainingResponse,
      exercises: action?.myTrainingResponse.exercises
    };
  }),
  on(AthleteApiActions.loadExerciseFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AthletePageActions.jumpExercise, (state, action) => {
    return {
      ...state,
      exercises: state.exercises ? state.exercises.map(exercise =>
        exercise.exerciseId === action.exercise.exerciseId ? action.exercise : exercise) : []
    };
  })
);
