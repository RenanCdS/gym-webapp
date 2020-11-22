import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';
import { RegisteredExercise } from 'src/app/core/models/RegisteredExercise';

export const login = createAction(
  '[App] Do Login',
  props<{ login: string, password: string }>()
);

export const exit = createAction(
  '[App] Exit'
);

export const empty = createAction(
  '[App] Empty'
);

export const indetifyUserRole = createAction(
  '[App] Indetify User Role'
);

export const startLoading = createAction(
  '[App] Start Loading'
);

export const finishLoading = createAction(
  '[App] Finish Loading'
);

export const updateAthlete = createAction(
  '[App] Update Athlete',
  props<{ athlete: Athlete }>()
);

export const createAthlete = createAction(
  '[App] Create Athlete'
);

export const getRegisteredExercises = createAction(
  '[App] Get Registered Exercises'
);

export const registerExercise = createAction(
  '[App] Register Exercise',
  props<{ exerciseData: FormData, callback: any }>()
);

export const createExercise = createAction(
  '[App] Create Exercise'
);

export const updateExercise = createAction(
  '[App] Update Exercise',
  props<{ exerciseToUpdate: RegisteredExercise }>()
);

export const updateExerciseBack = createAction(
  '[App] Update Exercise Back',
  props<{ exerciseData: FormData, exerciseId: number, callback: any }>()
);

export const showError = createAction(
  '[App] Show Error',
  props<{ error: string }>()
);


