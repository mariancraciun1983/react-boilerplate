/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';
import reducer, * as AUTH from '../../../../src/frontend/core/stores/reducers/auth';

const mockStore = configureStore();
const store = mockStore();
const initialState = clone(AUTH.initialState);

const user = {id: 1};
const token = '123';

describe('reducers/auth', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('trigger logout', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: AUTH.AUTH_LOGOUT },
    ];
    store.dispatch(AUTH.authLogout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('trigger authSet', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: AUTH.AUTH_SET, payload: { user, token } },
    ];
    store.dispatch(AUTH.authSet({ user, token }));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('sets auth data', () => {
    expect.assertions(1);
    const expectedState = {
      ...initialState,
      authenticated: true,
      user, token
    };
    const action = { type: AUTH.AUTH_SET, payload: { user, token },};
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('updates auth data', () => {
    expect.assertions(1);
    const state = {
      ...clone(initialState),
      authenticated: true,
      user: {id: 2},
      token: '321'
    }
    state.user.id = 2;
    const expectedState = {
      ...initialState,
      authenticated: true,
      user, token
    };
    const action = { type: AUTH.AUTH_UPDATE, payload: { user, token },};
    expect(reducer(state, action)).toEqual(expectedState);
  });


  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(AUTH.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });
});
