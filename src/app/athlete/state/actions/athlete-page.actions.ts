import { createAction, props } from '@ngrx/store';
import { TrainingTypeEnum } from 'src/app/core/enums/training-type.enum';
import { Athlete } from 'src/app/core/models/Athlete';
import { ExerciseToRegister } from '../../models/api/athletes/exercise-to-register';
import { RegisterAthleteRequest } from '../../models/api/athletes/register-athlete-request';
import { Exercise } from '../../models/api/exercise';

// action que verifica se o treino já foi iniciado
export const verifyTrainingStatus = createAction(
  '[Athlete] Verify Training Status'
);

export const startTraining = createAction(
  '[Athlete] Start Training',
  props<{ trainingType: TrainingTypeEnum }>()
);

export const finalizeTraining = createAction(
  '[Athlete] Finalize Training',
  props<{ isFinished: boolean }>()
);

export const changeExerciseWeight = createAction(
  '[Athlete] Change Exercise Weight',
  props<{ exercise: Exercise, currentWeight: number }>()
);

export const doneExercise = createAction(
  '[Athlete] Done Exercise',
  props<{ exercise: Exercise }>()
);

/**
 * @description add new exercise to the in memory data that refers to exercises of the train that will be saved 
 */
export const addExerciseToRegister = createAction(
  '[Athlete] Add Exercise To Register',
  props<{ trainingType: TrainingTypeEnum, exerciseToRegister: ExerciseToRegister }>()
);

export const removeExerciseToRegister = createAction(
  '[Athlete] Remove Exercise To Register',
  props<{ trainingType: TrainingTypeEnum, exerciseToRegister: ExerciseToRegister }>()
);

export const resetExercisesToRegister = createAction(
  '[Athlete] Reset Exercises To Register'
);

export const registerAthlete = createAction(
  '[Athlete] Register Athlete',
  props<{ athleteToRegister: RegisterAthleteRequest, callbackError: any }>()
);

export const updateAthlete = createAction(
  '[Athlete] Update Athlete',
  props<{ athleteToRegister: RegisterAthleteRequest, callbackError: any }>()
);

