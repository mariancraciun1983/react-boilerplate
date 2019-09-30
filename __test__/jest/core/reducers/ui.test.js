/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';
import reducer, * as UI from '../../../../src/frontend/core/stores/reducers/ui';

const mockStore = configureStore();
const store = mockStore();
const initialState = clone(UI.initialState);

describe('reducers/ui', () => {
  beforeEach(() => {
    store.clearActions();
  });


  it('trigger set theme', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: UI.UI_THEME },
    ];
    store.dispatch(UI.uiSetTheme());
    expect(store.getActions()).toStrictEqual(expectedActions);
  });

  it('trigger set language', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: UI.UI_LANGUAGE },
    ];
    store.dispatch(UI.uiSetLanguage());
    expect(store.getActions()).toStrictEqual(expectedActions);
  });


  it('set language', () => {
    expect.assertions(1);
    const expectedState = {
      ...initialState,
      language: 'es',
    };
    const action = { type: UI.UI_LANGUAGE, payload: 'es',};
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('set language loaded', () => {
    expect.assertions(1);
    const expectedState = {
      ...initialState,
      version: 1,
    };
    const action = { type: UI.UI_LANGUAGE_LOADED};
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
  it('set theme', () => {
    expect.assertions(1);
    const expectedState = {
      ...initialState,
      theme: 'dark',
    };
    const action = { type: UI.UI_THEME, payload: 'dark',};
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('set theme loaded', () => {
    expect.assertions(1);
    const expectedState = {
      ...initialState,
      version: 1,
    };
    const action = { type: UI.UI_THEME_LOADED};
    expect(reducer(initialState, action)).toEqual(expectedState);
  });


  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(UI.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });

});
