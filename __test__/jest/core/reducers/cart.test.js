/// <reference types="jest" />
import configureStore from 'redux-mock-store';
import clone from 'clone-deep';

import reducer, * as CART from '../../../../src/frontend/core/stores/reducers/cart';

const mockStore = configureStore();
const store = mockStore({});
const initialState = clone(CART.initialState);

describe('reducers/cart', () => {
  expect.assertions(1);
  beforeEach(() => {
    store.clearActions();
  });

  it('trigger save', () => {
    expect.assertions(1);
    const expectedActions = [
      { type: CART.CART_SAVE },
    ];
    store.dispatch(CART.save());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('trigger updateMovie - update', () => {
    expect.assertions(1);
    const expectedActions = [
      {
        type: CART.CART_UPDATE_MOVIE,
        payload: {
          movieId: 1,
          quantity: 2,
        },
      },
    ];
    store.dispatch(CART.updateMovie(1, 2));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('trigger updateMovie - add', () => {
    expect.assertions(1);
    const expectedState = clone(initialState);
    expectedState.saved = false;
    expectedState.dict[1] = 1;

    store.dispatch(CART.updateMovie(1, 1));
    const actions = store.getActions();
    expect(reducer(initialState, actions[0])).toEqual(expectedState);
  });

  it('set the cart', () => {
    expect.assertions(1);
    const state = clone(initialState);
    const cart = { 1: 2, 2: 3};

    expect(
      reducer(state,
        { type: CART.CART_SET, payload: cart}
      )
    ).toEqual({...state, dict: { ...cart }, saved: false});
  });

  it('delete a product from store', () => {
    expect.assertions(1);
    const state = clone(initialState);
    state.saved = true;
    state.dict[1] = 2;

    const expectedState = {...state};
    expectedState.saved = false;
    expectedState.dict = {}

    store.dispatch(CART.updateMovie(1, 0));
    const actions = store.getActions();
    expect(reducer(state, actions[0])).toEqual(expectedState);
  });

  it('update a product in store', () => {
    expect.assertions(1);
    const state = clone(initialState);
    state.saved = false;
    state.dict[1] = 2;

    const expectedState = {...state};
    expectedState.saved = false;
    expectedState.dict[1] = 3;

    store.dispatch(CART.updateMovie(1, 3));
    const actions = store.getActions();
    expect(reducer(initialState, actions[0])).toEqual(expectedState);
  });

  it('update the state', () => {
    expect.assertions(2);
    const state = clone(initialState);
    expect(
      reducer(
        {...state, saved: false },
        { type: CART.CART_UPDATE_STATE, payload: true}
      )
    ).toEqual({...state, saved: true});

    expect(
      reducer(
        {...state, saved: true },
        { type: CART.CART_UPDATE_STATE, payload: false}
      )
    ).toEqual({...state, saved: false});


  });

  it('returns defaults', () => {
    expect.assertions(2);
    const action = { type: 'DEFAULT', payload: 'loaded'};
    const state =  {empty: true};
    expect(reducer(undefined, action)).toStrictEqual(CART.initialState);
    expect(reducer(state, action)).toStrictEqual(state);
  });
});
