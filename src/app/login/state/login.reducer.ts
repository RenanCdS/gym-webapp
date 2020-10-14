import { createReducer, on } from '@ngrx/store';
import { UserRoleEnum } from 'src/app/core/enums/user-role.enum';
import { LoginApiActions, LoginPageActions } from './actions';
import * as App from '../../state/app.state';


export interface LoginState {
  login: string;
  token: string;
  error: any;
  userRole: UserRoleEnum;
}

export interface State extends App.State {
  login: LoginState;
}

export const initialState: LoginState = {
  login: '',
  token: '',
  error: null,
  userRole: null
};

export const loginReducer = createReducer<LoginState>(
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
  }),
  on(LoginPageActions.exit, state => {
    return {
      ...state,
      error: '',
      login: '',
      token: '',
      userRole: null
    }
  })
);
