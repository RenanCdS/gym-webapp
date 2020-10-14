import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Do Login',
  props<{ login: string, password: string }>()
);

export const exit = createAction(
  '[Login] Exit'
);

export const empty = createAction(
  '[Login] Empty'
);
