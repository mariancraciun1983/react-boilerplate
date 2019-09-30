/* eslint consistent-return: 0 */

import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import * as API from '../middleware/api';
import * as APP from '../stores/reducers/app';
import * as GENRES from '../stores/reducers/genres';

export function* onLoad() {
  try {
    // Make sure we first fetch the genres
    const json = yield call(API.genresGet);
    yield put({ type: GENRES.GENRES_SET, payload: json });
  } catch (e) {
    yield put({ type: APP.APP_STATE, payload: 'error' });
  }
}

export default function* sagas() {
  yield takeEvery(GENRES.GENRES_LOAD, onLoad);
}
