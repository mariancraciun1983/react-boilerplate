/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import mockData from '../../../../__mock__/api';

import * as SAGAS from '../../../../src/frontend/core/sagas/genres';
import * as API from '../../../../src/frontend/core/middleware/api';
import * as APP from '../../../../src/frontend/core/stores/reducers/app';
import * as GENRES from '../../../../src/frontend/core/stores/reducers/genres';

describe('sagas/genres', () => {

  it('handles default', () => {
    let saga = testSaga(SAGAS.default);
    saga
      .next()
      .takeEvery(GENRES.GENRES_LOAD, SAGAS.onLoad)
      .next()
      .isDone();
  });

  it('handles load - success', () => {
    const list = mockData.genres;
    expectSaga(SAGAS.onLoad)
      .provide([
        [matchers.call.fn(API.genresGet), list],
      ])
      .put({ type: GENRES.GENRES_SET, payload: list })
      .run();
  });

  it('handles load - fail', () => (
    expectSaga(SAGAS.onLoad)
      .provide([
        [matchers.call.fn(API.genresGet), throwError(new Error('API'))],
      ])
      .put({ type: APP.APP_STATE, payload: 'error' })
      .run()
  ));
});
