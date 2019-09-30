/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { cartDict } from '../../../../core/selectors';

export const cartSize = createSelector(
  cartDict,
  (cart) => {
    if (!cart) return 0;
    return Object.keys(cart).length;
  },
);
