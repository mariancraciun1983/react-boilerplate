/* eslint consistent-return: 0 */
import {
  put,
  take,
  fork,
  race,
  takeLatest,
} from 'redux-saga/effects';

import * as APP from '../stores/reducers/app';
import * as AUTH from '../stores/reducers/auth';
import * as GENRES from '../stores/reducers/genres';
import * as MOVIES from '../stores/reducers/movies';
import * as UI from '../stores/reducers/ui';

export function* setupAuth() {
  // fork the auth checker
  yield fork(function* startAuthCheck() {
    yield put({ type: AUTH.AUTH_CHECK });
  });

  // Wait for the auth_check to issue set or reset
  yield race({
    set: take(AUTH.AUTH_SET),
    reset: take(AUTH.AUTH_UNSET),
  });
}

export function* loadAssets() {
  // trigger assets
  yield put({ type: UI.UI_LOAD });
  yield take(UI.UI_LOADED);
}

export function* loadContent() {
  // Load genres
  yield put({ type: GENRES.GENRES_LOAD });
  yield take(GENRES.GENRES_SET);
  // Load movies
  yield put({ type: MOVIES.MOVIES_LOAD });
  yield take(MOVIES.MOVIES_SET);
}


export function* initialize() {
  yield loadAssets();
  yield setupAuth();
  yield loadContent();
}


export function* onInitialize() {
  yield initialize();
  // mark the app as ready
  yield put({ type: APP.APP_STATE, payload: 'loaded' });
}

export default function* sagas() {
  yield takeLatest(APP.APP_INITIALIZE, onInitialize);
}
