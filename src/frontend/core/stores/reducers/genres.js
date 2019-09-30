export const GENRES_LOAD = 'GENRES_LOAD';
export const GENRES_SET = 'GENRES_SET';

export const initialState = {
  list: null,
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GENRES_SET: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    default:
      return state;
  }
}
