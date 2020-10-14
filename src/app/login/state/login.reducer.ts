import { createReducer, on } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { LoginApiActions } from './actions';

export interface LoginState {
  login: string;
  token: string;
  error: string;
}

export const initialState: State = {
  login: {
    login: '',
    token: '',
    error: ''
  }
};

export const loginReducer = createReducer<State>(
  initialState,
  on(LoginApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      error: ''
    };
  }),
  on(LoginApiActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })
);
