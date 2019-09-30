/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/expect-expect */
/// <reference types="jest" />

import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { push, replace } from 'react-router-redux';


import * as SAGAS from '../../../../src/frontend/core/sagas/ui';
import * as UI from '../../../../src/frontend/core/stores/reducers/ui';
import { getCookie, setCookie, deleteCookie } from '../../../../src/frontend/core/utils/cookies';

describe('sagas/ui', () => {

  it('handles default', () => {
    testSaga(SAGAS.default)
      .next().takeLatest(UI.UI_LOAD, SAGAS.onLoad)
      .next().takeLatest(UI.UI_REDIRECT, SAGAS.onRedirect)
      .next().takeLatest(UI.UI_REPLACE, SAGAS.onReplace)
      .next().takeLatest(UI.UI_THEME, SAGAS.onTheme)
      .next().takeLatest(UI.UI_LANGUAGE, SAGAS.onLanguage)
      .next()
      .isDone();
  });

  it('handles onRedirect', () => {
    const action  = {payload: {to: '/'}}
    expectSaga(SAGAS.onRedirect, action)
      .put(push(action.payload))
      .run();
  });

  it('handles onReplace', () => {
    const action  = {payload: {to: '/'}}
    expectSaga(SAGAS.onReplace, action)
      .put(replace(action.payload))
      .run();
  });

  it('handles onLoad', () => {
    const theme = 'dark';
    const language = 'es';
    const defaultState = {
      language: 'en',
      version: 0,
      theme: 'light',
    }
    const expectedState = {
      language: 'es',
      version: 2,
      theme: 'dark',
    }
    expectSaga(SAGAS.onLoad)
    .withReducer(UI.default, defaultState)
      .provide({
        call(effect, next) {
          // Check for the API call to return fake value
          if (effect.fn === getCookie) {
            if (effect.args[0] == '_theme')
              return theme;
            else if (effect.args[0] == '_language')
              return language;
          }
          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
      .put({ type: UI.UI_THEME, payload: theme })
      .dispatch({ type: UI.UI_THEME_LOADED })

      .put({ type: UI.UI_LANGUAGE, payload: language })
      .dispatch({ type: UI.UI_LANGUAGE_LOADED })

      .put({ type: UI.UI_LOADED })
      .hasFinalState(expectedState)
      .run();
  });

  it('handles onTheme - dark', () => {
    const action =  {payload: 'dark' };
    expectSaga(SAGAS.onTheme, action)
      .provide([
        [matchers.call.fn(setCookie), '_theme',  action.payload],
      ])
      .call(setCookie, '_theme',  action.payload)
      .run();
  });

  it('handles onTheme - light', () => {
    const action = { payload: 'light' };
    expectSaga(SAGAS.onTheme, action)
      .provide([
        [matchers.call.fn(deleteCookie)],
      ])
      .call(deleteCookie, '_theme')
      .run();
  });

  it('handles onLanguage - es', () => {
    const action =  {payload: 'es' };
    expectSaga(SAGAS.onLanguage, action)
      .provide([
        [matchers.call.fn(setCookie), '_language',  action.payload],
      ])
      .call(setCookie, '_language',  action.payload)
      .run();
  });

  it('handles onLanguage - en', () => {
    const action = { payload: 'en' };
    expectSaga(SAGAS.onLanguage, action)
      .provide([
        [matchers.call.fn(deleteCookie)],
      ])
      .call(deleteCookie, '_language')
      .run();
  });

});
