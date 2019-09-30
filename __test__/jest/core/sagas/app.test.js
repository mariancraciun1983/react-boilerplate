/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { expectSaga, testSaga} from 'redux-saga-test-plan';

import * as SAGAS from '../../../../src/frontend/core/sagas/app';
import * as APP from '../../../../src/frontend/core/stores/reducers/app';
import * as AUTH from '../../../../src/frontend/core/stores/reducers/auth';
import * as UI from '../../../../src/frontend/core/stores/reducers/ui';
import * as GENRES from '../../../../src/frontend/core/stores/reducers/genres';
import * as MOVIES from '../../../../src/frontend/core/stores/reducers/movies';

describe('sagas/app', () => {
  it('handles default', () => {
    let saga = testSaga(SAGAS.default);
    saga
      .next()
      .takeLatest(APP.APP_INITIALIZE, SAGAS.onInitialize)
      .next()
      .isDone();
  });

  it('handles onInitialize', () => {
    let saga = testSaga(SAGAS.onInitialize);
    saga
      .next(SAGAS.initialize)
      .next().put({ type: APP.APP_STATE, payload: 'loaded' })
      .next()
      .isDone();
  });

  it('handles initialize flow', () => {
    let saga = testSaga(SAGAS.initialize);
    saga
      .next(SAGAS.loadAssets)
      .next(SAGAS.setupAuth)
      .next(SAGAS.loadContent)
      .next()
      .isDone();
  });

  it('handles setup auth flow - user', () => {
    expectSaga(SAGAS.setupAuth)
    .put({ type: AUTH.AUTH_CHECK })
    .dispatch({ type: AUTH.AUTH_SET })
    .run();
  });

  it('handles setup auth flow - guest', () => {
    expectSaga(SAGAS.setupAuth)
    .put({ type: AUTH.AUTH_CHECK })
    .dispatch({ type: AUTH.AUTH_UNSET })
    .run();
  });

  it('handles assets loading flow', () => {
    expectSaga(SAGAS.loadAssets)
    .put({ type: UI.UI_LOAD })
    .dispatch({ type: UI.UI_LOADED })
    .run();
  });

  it('handles content loading flow', () => {
    expectSaga(SAGAS.loadContent)
    .put({ type: GENRES.GENRES_LOAD })
    .dispatch({ type: GENRES.GENRES_SET })
    .put({ type: MOVIES.MOVIES_LOAD })
    .dispatch({ type: MOVIES.MOVIES_SET })
    .run();
  });

});
