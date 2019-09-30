/// <reference types="jest" />
import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
expect.extend({toBeDeepCloseTo});

import stateData from '../../../../../__mocks__/stateMock';
import * as globalSelectors from '../../../../../../../src/frontend/core/selectors';
import * as layoutSelectors from '../../../../../../../src/frontend/jsx/common/Layout/utils/selectors';


describe('components/common/selectors', () => {
  it('cartSize', () => {
    expect.assertions(1);
    const movies = globalSelectors.moviesList(stateData);
    const expected = 2;
    const cartDict = [
      {movie: movies[0], quantity: 1},
      {movie: movies[2], quantity: 2}
    ]
    expect(layoutSelectors.cartSize.resultFunc(cartDict)).toEqual(expected);
  });

});
