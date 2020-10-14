import { createReducer, on } from '@ngrx/store';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { State } from 'src/app/state/app.state';
import { LoginApiActions } from './actions';

export interface LoginState {
  login: string;
  token: string;
  error: any;
  userRole: UserRoleEnum;
}

export const initialState: State = {
  login: {
    login: '',
    token: '',
    error: null,
    userRole: null
  }
};

export const loginReducer = createReducer<State>(
  initialState,
  on(LoginApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      userRole: action.userRole,
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
