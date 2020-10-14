import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login] Do Login',
  props<{ login: string, password: string }>()
);
