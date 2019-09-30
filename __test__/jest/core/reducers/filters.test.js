/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';

import reducer, * as FILTERS from '../../../../src/frontend/core/stores/reducers/filters';

const mockStore = configureStore();
const store = mockStore({});
const initialState = clone(FILTERS.initialState);


describe('reducers/filters', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('trigger filter by string', () => {
    expect.assertions(1);
    const expectedActions = [
      {
        type: FILTERS.FILTER_STRING,
        payload: 'Appl',
      },
    ];
    store.dispatch(FILTERS.setString('Appl'));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('set the string to store', () => {
    expect.assertions(1);
    const expectedState = clone(initialState);
    expectedState.string = 'Appl';
    expectedState.string_lower = 'appl';

    store.dispatch(FILTERS.setString('Appl'));
    const actions = store.getActions();
    expect(reducer(initialState, actions[0])).toEqual(expectedState);
  });


  it('unset the string to store', () => {
    expect.assertions(1);
    const state = clone(initialState);
    state.string = 'Appl';
    state.string_lower = 'appl';
    const expectedState = clone(initialState);


    store.dispatch(FILTERS.setString(''));
    const actions = store.getActions();
    expect(reducer(state, actions[0])).toEqual(expectedState);
  });


  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(FILTERS.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });
});
