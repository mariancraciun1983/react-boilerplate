/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';
import reducer, * as MOVIES from '../../../../src/frontend/core/stores/reducers/movies';

import mockData from '../../../../__mock__/api';

const mockStore = configureStore();
const store = mockStore({});


describe('reducers/movies', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('set movies', () => {
    expect.assertions(1);
    const list = mockData.movies;
    const initialState = clone(MOVIES.initialState);
    const expectedState = {
      ...initialState,
      list,
    };
    const action = {
      type: MOVIES.MOVIES_SET,
      payload: list,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });


  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(MOVIES.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });
});
