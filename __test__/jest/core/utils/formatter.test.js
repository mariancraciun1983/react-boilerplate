/// <reference types="jest" />

import { formatPrice } from '../../../../src/frontend/core/utils/formatter';


describe('utils/Formatters', () => {
  it('Should round prices with 2 decimals', () => {
    expect.assertions(3);
    expect(formatPrice(-10)).toBe('-10.00');
    expect(formatPrice(10.1234)).toBe('10.12');
    expect(formatPrice(0)).toBe('0.00');
  });
});
