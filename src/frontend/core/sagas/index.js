import { fork, all } from 'redux-saga/effects';

import appSagas from './app';
import authSagas from './auth';
import genresSagas from './genres';
import moviesSagas from './movies';
import cartSagas from './cart';
import uiSagas from './ui';

export default function* root() {
  try {
    yield all([
      fork(appSagas),
      fork(authSagas),
      fork(genresSagas),
      fork(moviesSagas),
      fork(cartSagas),
      fork(uiSagas),
    ]);
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e);
  }
}
