import { createAction } from 'redux-actions';

export const CART_UPDATE_MOVIE = 'CART_UPDATE_MOVIE';
export const CART_UPDATE_STATE = 'CART_UPDATE_STATE';
export const CART_SAVE = 'CART_SAVE';
export const CART_SET = 'CART_SET';

export const initialState = {
  // in our case, checking if a movie is in cart, is more efficient with a hashmap than a list
  dict: {},
  saved: true, // by default it's empty so it's not submitted
};

export default function reducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case CART_SET: {
      return {
        ...state, dict: { ...action.payload }, saved: false,
      };
    }

    case CART_UPDATE_MOVIE: {
      const { movieId, quantity } = action.payload;
      const dict = { ...state.dict };

      // do we need to delete?
      if (quantity < 1) {
        delete dict[movieId];
      } else {
        dict[movieId] = quantity;
      }
      return {
        ...state, dict, saved: false,
      };
    }

    case CART_UPDATE_STATE: {
      return {
        ...state, saved: action.payload,
      };
    }
    default:
      return state;
  }
}


export const updateMovie = createAction(CART_UPDATE_MOVIE,
  (movieId, quantity) => ({ movieId, quantity }));

export const save = createAction(CART_SAVE);
