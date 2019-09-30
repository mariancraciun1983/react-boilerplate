import { createAction } from 'redux-actions';

export const FILTER_STRING = 'FILTER_STRING';

export const initialState = {
  string: '',
  string_lower: '',
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FILTER_STRING: {
      return {
        ...state,
        string: action.payload ? action.payload : '',
        string_lower: action.payload ? action.payload.toLowerCase() : '',
      };
    }
    default:
      return state;
  }
}

export const setString = createAction(FILTER_STRING, (string) => (string));
