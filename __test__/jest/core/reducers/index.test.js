
/// <reference types="jest" />

import reducers from '../../../../src/frontend/core/stores/reducers';

 
describe('reducers/index', () => {

  it('combines reducers', () => {
    expect.assertions(1);
    expect(Object.keys(reducers)).toHaveLength(9);
  });

});
