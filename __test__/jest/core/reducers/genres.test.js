/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';
import reducer, * as GENRES from '../../../../src/frontend/core/stores/reducers/genres';

import mockData from '../../../../__mock__/api';

const mockStore = configureStore();
const store = mockStore({});


describe('reducers/genres', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('set genres', () => {
    expect.assertions(1);
    const list = mockData.genres;
    const initialState = clone(GENRES.initialState);
    const expectedState = {
      ...initialState,
      list,
    };
    const action = {
      type: GENRES.GENRES_SET,
      payload: list,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });


  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(GENRES.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });
});
