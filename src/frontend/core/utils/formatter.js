/* eslint-disable import/prefer-default-export */
export const formatPrice = function formatPrice(num) {
  return parseFloat(Math.round(num * 100) / 100).toFixed(2);
};
