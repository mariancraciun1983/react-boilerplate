/* eslint consistent-return: 0 */
import {
  put,
  call,
  takeEvery,
  select,
} from 'redux-saga/effects';

import { cartDict } from '../selectors';
import * as API from '../middleware/api';
import * as CART from '../stores/reducers/cart';
import * as APP from '../stores/reducers/app';
import * as AUTH from '../stores/reducers/auth';

export function* onLoad() {
  try {
    // Make sure we first fetch the genres
    const json = yield call(API.cartGet);
    const cart = {};
    json.forEach((c) => {
      cart[c.movieId] = c.quantity;
    });
    const existingCart = yield select(cartDict);
    Object.keys(existingCart).forEach((key) => {
      cart[key] = existingCart[key];
    });
    yield put({ type: CART.CART_SET, payload: cart });
  } catch (e) {
    // silent failure when loading the saved cart
  }
}


export function* onSave() {
  try {
    // select the cart data
    const cartData = yield select(cartDict);
    const movieIds = Object.keys(cartData);
    const cartToSend = [];
    movieIds.forEach((movieId) => {
      cartToSend.push({
        movieId,
        quantity: cartData[movieId],
      });
    });
    const json = yield call(API.cartSave, { cart: cartToSend });
    if (json.success) {
      yield put({ type: CART.CART_UPDATE_STATE, payload: true });
    } else {
      yield put({ type: APP.APP_STATE, payload: 'error' });
    }
  } catch (e) {
    yield put({ type: APP.APP_STATE, payload: 'error' });
  }
}

export default function* sagas() {
  yield takeEvery(AUTH.AUTH_SET, onLoad);
  yield takeEvery(CART.CART_SAVE, onSave);
}
