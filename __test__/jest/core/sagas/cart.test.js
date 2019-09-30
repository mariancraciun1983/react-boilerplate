/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import {
  select,
} from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import mockData from '../../../../__mock__/api';

import { cartDict } from '../../../../src/frontend/core/selectors';
import * as SAGAS from '../../../../src/frontend/core/sagas/cart';
import * as API from '../../../../src/frontend/core/middleware/api';
import * as APP from '../../../../src/frontend/core/stores/reducers/app';
import * as AUTH from '../../../../src/frontend/core/stores/reducers/auth';
import * as CART from '../../../../src/frontend/core/stores/reducers/cart';

describe('sagas/cart', () => {

  it('handles default', () => {
    let saga = testSaga(SAGAS.default);
    saga
      .next()
      .takeEvery(AUTH.AUTH_SET, SAGAS.onLoad)
      .next()
      .takeEvery(CART.CART_SAVE, SAGAS.onSave)
      .next()
      .isDone();
  });

  it('handles load with empty cart - success', () => {
    const savedList = mockData.cart;
    const expected = {};
    savedList.forEach((c) => {
      expected[c.movieId] = c.quantity;
    });
    expectSaga(SAGAS.onLoad)
      .provide([
        [select(cartDict), {}],
        [matchers.call.fn(API.cartGet), savedList],
      ])
      .put({ type: CART.CART_SET, payload: expected })
      .run();
  });

  it('handles load with merged cart - success', () => {
    const savedList = mockData.cart;
    const memoryList = {}
    const movie = mockData.movies[49];
    memoryList[movie.id] = 2;
    const expected = {};
    savedList.forEach((c) => {
      expected[c.movieId] = c.quantity;
    });
    expected[movie.id] = 2;

    expectSaga(SAGAS.onLoad)
      .provide([
        [select(cartDict), memoryList],
        [matchers.call.fn(API.cartGet), savedList],
      ])
      .put({ type: CART.CART_SET, payload: expected })
      .run();
  });

  it('handles load - fail', () => (
    expectSaga(SAGAS.onLoad)
      .provide([
        [select(cartDict), {}],
        [matchers.call.fn(API.cartGet), throwError(new Error('API'))],
      ])
      .run()
  ));

  it('handles save - success', () => {
    const memoryList = {}
    const movie = mockData.movies[49];
    memoryList[movie.id] = 2;

    const result = { success: true };
    expectSaga(SAGAS.onSave)
      .provide([
        [select(cartDict), memoryList],
        [matchers.call.fn(API.cartSave), result],
      ])
      .put({ type: CART.CART_UPDATE_STATE, payload: true })
      .run();
  });

  it('handles save - fail', () => {
    const memoryList = {}
    const movie = mockData.movies[49];
    memoryList[movie.id] = 2;

    const result = { success: false };
    expectSaga(SAGAS.onSave)
      .provide([
        [select(cartDict), memoryList],
        [matchers.call.fn(API.cartSave), result],
      ])
      .put({ type: APP.APP_STATE, payload: 'error' })
      .run();
  });

  it('handles submit - fail 2', () => {
    const memoryList = {}
    const movie = mockData.movies[49];
    memoryList[movie.id] = 2;
    expectSaga(SAGAS.onSave)
      .provide([
        [select(cartDict), memoryList],
        [matchers.call.fn(API.cartSave), throwError(new Error('API'))],
      ])
      .put({ type: APP.APP_STATE, payload: 'error' })
      .run();
  });
});
