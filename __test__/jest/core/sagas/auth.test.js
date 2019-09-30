/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';


import * as SAGAS from '../../../../src/frontend/core/sagas/auth';
import * as selectors from '../../../../src/frontend/core/selectors';
import * as API from '../../../../src/frontend/core/middleware/api';
import * as AUTH from '../../../../src/frontend/core/stores/reducers/auth';
import { getCookie, setCookie, deleteCookie } from '../../../../src/frontend/core/utils/cookies';

describe('sagas/auth ', () => {

  it('handles default', () => {
    testSaga(SAGAS.default)
      .next().takeLatest(AUTH.AUTH_SET, SAGAS.onSet)
      .next().takeLatest(AUTH.AUTH_UNSET, SAGAS.onUnset)
      .next().takeLatest(AUTH.AUTH_CHECK, SAGAS.onCheck)
      .next().takeLatest(AUTH.AUTH_LOGOUT, SAGAS.onLogout)
      .next().takeLatest(AUTH.AUTH_SET, SAGAS.authUpdater)
      .next()
      .isDone();
  });

  it('handles onSet - user', () => {
    const action = {payload: {token: 'abc'}};
    expectSaga(SAGAS.onSet, action)
      .provide([
        [matchers.call.fn(setCookie), '_token',  action.payload.token],
      ])
      .call(setCookie, '_token',  action.payload.token)
      .run();
  });

  it('handles onSet - empty', () => {
    const action = {payload: {token: null}};
    expectSaga(SAGAS.onSet, action)
      .provide([
        [matchers.call.fn(deleteCookie)],
      ])
      .call(deleteCookie, '_token')
      .run();
  });

  it('handles onUnset', () => {
    expectSaga(SAGAS.onUnset)
      .provide([
        [matchers.call.fn(deleteCookie)],
      ])
      .call(deleteCookie, '_token')
      .run();
  });

  it('handles onCheck - user OK/NOK', () => {
    const state = {
      authenticated: false,
      token: null,
      user: null,
    }
    const expectedOK = {
      authenticated: true,
      token: '123',
      user: {id: 1},
    };

    const expectedNOK = {
      authenticated: false,
      token: null,
      user: null,
    };

    const response = {user: {id: 1}, token: '123'};

    expectSaga(SAGAS.onCheck)
      .withReducer(AUTH.default, state)
      .provide([
        [matchers.call.fn(getCookie), '123'],
        [matchers.call.fn(API.authToken), response],
      ])
      .call(getCookie, '_token')
      .put({ type: AUTH.AUTH_SET, payload: { ...response, } })
      .hasFinalState(expectedOK)
      .run();

    expectSaga(SAGAS.onCheck)
      .withReducer(AUTH.default, state)
      .provide([
        [matchers.call.fn(getCookie), '123'],
        [matchers.call.fn(API.authToken), {}],
      ])
      .call(getCookie, '_token')
      .put({ type: AUTH.AUTH_UNSET })
      .hasFinalState(expectedNOK)
      .run();

    expectSaga(SAGAS.onCheck)
      .withReducer(AUTH.default, state)
      .provide([
        [matchers.call.fn(getCookie), '123'],
        [matchers.call.fn(API.authToken), throwError(new Error('API'))],
      ])
      .call(getCookie, '_token')
      .put({ type: AUTH.AUTH_UNSET })
      .hasFinalState(expectedNOK)
      .run();
  });

  it('handles onCheck - guest', () => {
    const state = {
      authenticated: false,
      token: null,
      user: null,
    }
    const expected = {
      authenticated: false,
      token: null,
      user: null,
    };
    expectSaga(SAGAS.onCheck)
      .withReducer(AUTH.default, state)
      .provide([
        [matchers.call.fn(getCookie), ''],
      ])
      .call(getCookie, '_token')
      .put({ type: AUTH.AUTH_UNSET})
      .hasFinalState(expected)
      .run();
  });

  it('handles logout', () => {
    const state = {
      authenticated: true,
      token: 'xxx',
      user: {},
    }
    const expected = {
      authenticated: false,
      token: null,
      user: null
    };
    expectSaga(SAGAS.onLogout)
      .withReducer(AUTH.default, state)
      .hasFinalState(expected)
      .run();
  });

  it('handles authUpdater', () => {
    testSaga(SAGAS.authUpdater)
      .next().fork(SAGAS.authUpdaterChecker)
      .next().take(AUTH.AUTH_UNSET)
      .next().cancel()
      .next()
      .isDone();
  });

  it('handles authUpdaterChecker - guest', () => {
    testSaga(SAGAS.authUpdaterChecker)
      .next().delay(300000)
      .next().select(selectors.authToken)
      .next('')
      .put({ type: AUTH.AUTH_UNSET })
      .next().cancel()
      .next().cancelled()
      .next()
      .isDone();
  });

  it('handles authUpdaterChecker - user OK/NOK', () => {
    const response = {token: '123', user: { id: 1}}
    // I have tried to work with save/restore but there are issues with the delay
    testSaga(SAGAS.authUpdaterChecker)
      .next().delay(300000)
      .next().select(selectors.authToken)
      .next(response.token)
      .call(API.authToken, { token: response.token })
      .next(response)
      .put({ type: AUTH.AUTH_UPDATE, payload: { ...response } })
      .next().delay(300000) //we loop again
      .next().finish()
      .next()
      .isDone();


    testSaga(SAGAS.authUpdaterChecker)
      .next().delay(300000)
      .next().select(selectors.authToken)
      .next(response.token)
      .call(API.authToken, { token: response.token })
      .next({})
      .put({ type: AUTH.AUTH_UNSET })
      .next().cancel()
      .next().cancelled()
      .next()
      .isDone()
  });

});
