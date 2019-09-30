
/// <reference types="jest" />

import '../../../../src/frontend/core/polyfill';

// we rely on the fact that these polyfils won't ever be added in js
describe('polyfil', () => {
  it('does capitalize', () => {
    expect.assertions(4);
    expect("".capitalize()).toBe("");
    expect("a".capitalize()).toBe("A");
    expect("1".capitalize()).toBe("1");
    expect("aAaABb123AA".capitalize()).toBe("AAaABb123AA");
  });

  it('does append array', () => {
    expect.assertions(5);
    expect([].appendArray([])).toEqual([]);
    expect([].appendArray([1,2,3])).toEqual([1,2,3]);
    expect([1,2,3].appendArray([4,5,6])).toEqual([1,2,3,4,5,6]);
    expect([1,2,3].appendArray([1,2,4], true)).toEqual([1,2,3,4]);
    expect([].appendArray([1,1,2,3], true)).toEqual([1,1,2,3]);
  });

});
