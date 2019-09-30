export const MOVIES_LOAD = 'MOVIES_LOAD';
export const MOVIES_SET = 'MOVIES_SET';

export const initialState = {
  list: null,
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case MOVIES_SET: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    default:
      return state;
  }
}
