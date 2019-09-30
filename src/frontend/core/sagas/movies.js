/* eslint consistent-return: 0 */
import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects';

import * as API from '../middleware/api';
import * as APP from '../stores/reducers/app';
import * as MOVIES from '../stores/reducers/movies';

export function* onLoad() {
  try {
    const json = yield call(API.moviesGet);
    const movies = json.map((movie) => {
      // eslint-disable-next-line no-param-reassign
      movie.title_lower = movie.title.toLowerCase();
      return movie;
    });
    yield put({ type: MOVIES.MOVIES_SET, payload: movies });
  } catch (e) {
    yield put({ type: APP.APP_STATE, payload: 'error' });
  }
}

export default function* sagas() {
  yield takeEvery(MOVIES.MOVIES_LOAD, onLoad);
}
