import { createReducer, on } from '@ngrx/store';
import { UserRoleEnum } from '../core/enums/user-role.enum';
import { AppApiActions, AppPageActions } from './actions';


export interface State {
  login: string;
  token: string;
  error: string;
  userRole: UserRoleEnum;
}

const initialState: State = {
  error: '',
  login: '',
  token: '',
  userRole: null
};

export const appReducer = createReducer<State>(
  initialState,
  on(AppApiActions.loginSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      userRole: action.userRole,
      error: ''
    };
  }),
  on(AppApiActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(AppPageActions.exit, state => {
    return {
      ...state,
      error: '',
      login: '',
      token: '',
      userRole: null
    };
  }),
  on(AppApiActions.userRoleSuccess, (state, action) => {
    return {
      ...state,
      userRole: action.userRole
    };
  })
);
