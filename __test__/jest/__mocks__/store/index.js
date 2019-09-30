import clone from 'clone-deep';

import * as FullData from '../../../../__mock__/api';

const defaultStore = {
  app: {
    state: 'loading',
  },
  auth: {
    authenticated: false,
    token: null,
    user: null,
  },
  cart: {
    dict: {},
    saved: true,
  },
  filters: {
    string: '',
    string_lower: '',
  },
  genres: {
    list: null,
  },
  movies: {
    list: null,
  },
  ui: {
    language: 'en',
    version: 0,
    theme: 'light',
  },
  routing: {},
  form: {},
};

const fullStore = clone(defaultStore);
fullStore.state = 'loaded';
fullStore.genres.list = FullData.genres;
fullStore.movies.list = FullData.movies.slice(0,200);
export default {
  defaultStore,
  fullStore,
}
