/* eslint consistent-return: 0 */
import {
  put, take, takeLatest, call,
} from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import * as UI from '../stores/reducers/ui';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';


export function* onLoad() {
  const theme = yield call(getCookie, '_theme', 'light');
  const language = yield call(getCookie, '_language', 'en');
  yield put({ type: UI.UI_THEME, payload: theme });
  yield take(UI.UI_THEME_LOADED);
  yield put({ type: UI.UI_LANGUAGE, payload: language });
  yield take(UI.UI_LANGUAGE_LOADED);

  yield put({ type: UI.UI_LOADED });
}

export function* onRedirect(action) {
  yield put(push(action.payload));
}

export function* onReplace(action) {
  yield put(replace(action.payload));
}


export function* onTheme(action) {
  const theme = action.payload;
  if (theme === 'light') {
    yield call(deleteCookie, '_theme');
  } else {
    yield call(setCookie, '_theme', theme);
  }
}

export function* onLanguage(action) {
  const language = action.payload;
  if (language === 'en') {
    yield call(deleteCookie, '_language');
  } else {
    yield call(setCookie, '_language', language);
  }
}

export default function* sagas() {
  yield takeLatest(UI.UI_LOAD, onLoad);
  yield takeLatest(UI.UI_REDIRECT, onRedirect);
  yield takeLatest(UI.UI_REPLACE, onReplace);
  yield takeLatest(UI.UI_THEME, onTheme);
  yield takeLatest(UI.UI_LANGUAGE, onLanguage);
}
