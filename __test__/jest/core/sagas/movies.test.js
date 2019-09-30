/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import mockData from '../../../../__mock__/api';

import * as SAGAS from '../../../../src/frontend/core/sagas/movies';
import * as API from '../../../../src/frontend/core/middleware/api';
import * as APP from '../../../../src/frontend/core/stores/reducers/app';
import * as MOVIES from '../../../../src/frontend/core/stores/reducers/movies';

describe('sagas/movies', () => {

  it('handles default', () => {
    let saga = testSaga(SAGAS.default);
    saga
      .next()
      .takeEvery(MOVIES.MOVIES_LOAD, SAGAS.onLoad)
      .next()
      .isDone();
  });

  it('handles load - success', () => {
    const list = mockData.movies;
    expectSaga(SAGAS.onLoad)
      .provide([
        [matchers.call.fn(API.moviesGet), list],
      ])
      .put({ type: MOVIES.MOVIES_SET, payload: list })
      .run();
  });

  it('handles load - fail', () => (
    expectSaga(SAGAS.onLoad)
      .provide([
        [matchers.call.fn(API.moviesGet), throwError(new Error('API'))],
      ])
      .put({ type: APP.APP_STATE, payload: 'error' })
      .run()
  ));
});
