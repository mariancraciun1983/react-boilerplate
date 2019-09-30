import {
  put,
  call,
  cancel,
  take,
  takeLatest,
  fork,
  delay,
  cancelled,
  select,
} from 'redux-saga/effects';

import { authToken } from '../selectors';
import * as API from '../middleware/api';
import * as AUTH from '../stores/reducers/auth';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

export function* onSet(action) {
  if (action.payload.token) {
    const { token } = action.payload;
    yield call(setCookie, '_token', token);
  } else {
    yield call(deleteCookie, '_token');
  }
}

export function* onUnset() {
  yield call(deleteCookie, '_token');
}

export function* onLogout() {
  yield put({ type: AUTH.AUTH_UNSET, payload: {} });
}


export function* onCheck() {
  try {
    const ctoken = yield call(getCookie, '_token');
    if (ctoken) {
      const json = yield call(API.authToken, { token: ctoken });
      if (json.token && json.user) {
        const { token, user } = json;
        yield put({ type: AUTH.AUTH_SET, payload: { token, user } });
      } else {
        yield put({ type: AUTH.AUTH_UNSET });
      }
    } else {
      yield put({ type: AUTH.AUTH_UNSET });
    }
  } catch (e) {
    yield put({ type: AUTH.AUTH_UNSET });
  }
}

let updaterProc = null;
export function* authUpdaterChecker() {
  try {
    const ttl = 1000 * 5 * 60; // Check the auth each 5 minutes
    while (true) {
      yield delay(ttl);

      const token = yield select(authToken);
      if (!token) {
        yield put({ type: AUTH.AUTH_UNSET });
        break;
      }

      const json = yield call(API.authToken, { token });
      if (json.token && json.user) {
        yield put({ type: AUTH.AUTH_UPDATE, payload: { token: json.token, user: json.user } });
      } else {
        yield put({ type: AUTH.AUTH_UNSET });
        break;
      }
    }
    // eslint-disable-next-line no-use-before-define
    yield cancel(updaterProc);
  } finally {
    yield cancelled();
  }
}

export function* authUpdater() {
  updaterProc = yield fork(authUpdaterChecker);
  yield take(AUTH.AUTH_UNSET);

  // this might be redundant
  yield cancel(updaterProc);
}


export default function* sagas() {
  yield takeLatest(AUTH.AUTH_SET, onSet);
  yield takeLatest(AUTH.AUTH_UNSET, onUnset);
  yield takeLatest(AUTH.AUTH_CHECK, onCheck);
  yield takeLatest(AUTH.AUTH_LOGOUT, onLogout);
  yield takeLatest(AUTH.AUTH_SET, authUpdater);
}
