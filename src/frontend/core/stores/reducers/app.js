import { createAction } from 'redux-actions';

export const APP_INITIALIZE = 'APP_INITIALIZE';
export const APP_STATE = 'APP_STATE';

export const initialState = {
  state: 'loading', // loading|loaded|error
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case APP_STATE: {
      return {
        ...state,
        state: action.payload,
      };
    }
    default:
      return state;
  }
}

export const initialize = createAction(APP_INITIALIZE);
