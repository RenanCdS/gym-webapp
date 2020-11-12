import { createAction, props } from '@ngrx/store';
import { Athlete } from 'src/app/core/models/Athlete';

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
