
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import app from './app';
import auth from './auth';
import genres from './genres';
import movies from './movies';
import cart from './cart';
import filters from './filters';
import ui from './ui';

export const reducers = {
  app,
  auth,
  genres,
  movies,
  cart,
  filters,
  ui,
  routing: routerReducer,
  form: formReducer,
};
export default reducers;
