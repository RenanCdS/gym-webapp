import { createReducer } from '@ngrx/store';

export interface LoginState {
  login: string;
  password: string;
}

const initialState: LoginState = {
  login: null,
  password: null
};

export const loginReducer = createReducer<LoginState>(
  initialState
);
