/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { testSaga } from 'redux-saga-test-plan';
import { fork } from 'redux-saga/effects';



import * as SAGAS from '../../../../src/frontend/core/sagas';
import appSagas from '../../../../src/frontend/core/sagas/app';
import authSagas from '../../../../src/frontend/core/sagas/auth';
import genresSagas from '../../../../src/frontend/core/sagas/genres';
import moviesSagas from '../../../../src/frontend/core/sagas/movies';
import cartSagas from '../../../../src/frontend/core/sagas/cart';
import uiSagas from '../../../../src/frontend/core/sagas/ui';

describe('sagas/index', () => {

  it('handles root', () => {
    // Maybe check for fork from the test plan
    testSaga(SAGAS.default)
      .next()
      .all([
        fork(appSagas),
        fork(authSagas),
        fork(genresSagas),
        fork(moviesSagas),
        fork(cartSagas),
        fork(uiSagas),
      ])
      .next()
      .isDone();
  });


});
