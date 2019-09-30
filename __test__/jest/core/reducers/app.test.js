/// <reference types="jest" />

import configureStore from 'redux-mock-store';
import clone from 'clone-deep';

import reducer, * as APP from '../../../../src/frontend/core/stores/reducers/app';


const mockStore = configureStore();
const store = mockStore({});
const initialState = clone(APP.initialState);

describe('reducers/app', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('trigger initialization', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: APP.APP_INITIALIZE },
    ];
    store.dispatch(APP.initialize());
    expect(store.getActions()).toStrictEqual(expectedActions);
  });

  it('set app loaded', () => {
    expect.assertions(1);
    const expectedState = {
      ...clone(initialState),
      state: 'loaded',
    };
    const action = { type: APP.APP_STATE, payload: 'loaded'};
    expect(reducer(initialState, action)).toStrictEqual(expectedState);
  });

  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(APP.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });

});
