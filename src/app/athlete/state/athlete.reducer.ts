import { createReducer, on } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Athlete } from 'src/app/core/models/Athlete';
import { AppPageActions } from 'src/app/state/actions';
import { ExerciseToRegister } from '../models/api/athletes/exercise-to-register';
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
  athleteToUpdate: Athlete;
  isRegistration: boolean; // variável usada para verificar se a tela de formulário é um cadastro ou uma atualização,
  trainingToRegister: {
    trainingA: {
      exercises: ExerciseToRegister[];
    },
    trainingB: {
      exercises: ExerciseToRegister[];
    },
    trainingC: {
      exercises: ExerciseToRegister[];
    }
  };
}

const initialState: AthleteState = {
  exercises: null,
  currentTrainingType: null,
  dailyTrainingId: null,
  isFinished: null,
  isStarted: null,
  trainingId: null,
  error: '',
  currentExercise: null,
  isRegistration: true,
  athleteToUpdate: null,
  trainingToRegister: {
    trainingA: {
      exercises: []
    },
    trainingB: {
      exercises: []
    },
    trainingC: {
      exercises: []
    }
  }
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
  }),
  on(AthleteApiActions.startTrainingFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AthleteApiActions.changeWeightSuccess, (state, action) => {
    return {
      ...state,
      exercises: state.exercises.map(exercise => {
        if (exercise.exerciseId === action.exerciseId) {
          const updatedExercise = Object.assign({}, exercise, { weight: action.currentWeight });
          return updatedExercise;
        }
        return exercise;
      })
    };
  }),
  on(AthleteApiActions.finalizeTrainingSuccess, (state, action) => {
    return {
      ...state,
      isFinished: true,
      isStarted: true
    };
  }),
  on(AthleteApiActions.finalizeTrainingFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AthletePageActions.doneExercise, (state, action) => {
    return {
      ...state,
      exercises: state.exercises ? state.exercises.map(exercise =>
        exercise.exerciseId === action.exercise.exerciseId ? action.exercise : exercise) : []
    };
  }),
  on(AthletePageActions.addExerciseToRegister, (state, action) => {
    const trainingType = `training${action.trainingType}`;

    const training = {
      trainingA: {
        exercises: [...state.trainingToRegister.trainingA.exercises]
      },
      trainingB: {
        exercises: [...state.trainingToRegister.trainingB.exercises]
      },
      trainingC: {
        exercises: [...state.trainingToRegister.trainingC.exercises]
      }
    };

    if (((training[trainingType].exercises) as Array<ExerciseToRegister>).find(exercise =>
      exercise.exerciseId === action.exerciseToRegister.exerciseId)) {
      return {
        ...state
      };
    }

    training[trainingType].exercises.push(action.exerciseToRegister);

    return {
      ...state,
      trainingToRegister: training
    };
  }),
  on(AthletePageActions.resetExercisesToRegister, (state) => {
    return {
      ...state,
      trainingToRegister: {
        trainingA: {
          exercises: []
        },
        trainingB: {
          exercises: []
        },
        trainingC: {
          exercises: []
        }
      }
    };
  }),
  on(AthletePageActions.removeExerciseToRegister, (state, action) => {
    const trainingType = `training${action.trainingType}`;
    const training = {
      trainingA: {
        exercises: [...state.trainingToRegister.trainingA.exercises]
      },
      trainingB: {
        exercises: [...state.trainingToRegister.trainingB.exercises]
      },
      trainingC: {
        exercises: [...state.trainingToRegister.trainingC.exercises]
      }
    };
    training[trainingType].exercises = training[trainingType].exercises.filter(
      exercise => exercise.exerciseId !== action.exerciseToRegister.exerciseId
    );
    return {
      ...state,
      trainingToRegister: training
    };
  }),
  on(AppPageActions.exit, state => {
    return initialState;
  }),
);
