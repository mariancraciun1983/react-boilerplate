import { createAction } from 'redux-actions';

export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_SET = 'AUTH_SET';
export const AUTH_UNSET = 'AUTH_UNSET';
export const AUTH_UPDATE = 'AUTH_UPDATE';

export const initialState = {
  authenticated: false,
  token: null,
  user: null,
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case AUTH_SET: {
      const { user, token } = action.payload;
      return {
        ...state,
        authenticated: true,
        token,
        user,
      };
    }
    case AUTH_UNSET: {
      return {
        ...state,
        authenticated: false,
        token: null,
        user: null,
      };
    }
    case AUTH_UPDATE: {
      const { user, token } = action.payload;
      return {
        ...state,
        token,
        user,
      };
    }
    default:
      return state;
  }
}

export const authSet = createAction(AUTH_SET, (data) => data);
export const authLogout = createAction(AUTH_LOGOUT);
