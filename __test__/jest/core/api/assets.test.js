/* eslint-disable no-undef */
/// <reference types="jest" />




const mockLoadStyle = jest.fn();
let mockLoadLang = jest.fn();
jest.mock('../../../../src/frontend/styles', () => ({
  __esModule: true, // mock the exports
  default: jest.fn().mockImplementation(async (...args) => {
    mockLoadStyle(...args);
    return {
      use: () => {},
      unuse: () => {},
    }
  })
}));
jest.mock('../../../../src/frontend/lang', () => ({
  __esModule: true, // mock the exports
  default: jest.fn().mockImplementation(async (...args) => {
    mockLoadLang(...args);
    return {
      default: {}
    }
  }),
}));

import * as ASSETS from '../../../../src/frontend/core/middleware/assets';
import * as UI from '../../../../src/frontend/core/stores/reducers/ui';

// we rely on the fact that these polyfils won't ever be added in js
describe('middlware/assets', () => {


  it('handles middleware actions', async () => {
    expect.assertions(4);

    const next = jest.fn();
    const store = jest.fn();
    store.dispatch = jest.fn();

    //register the store first
    ASSETS.middleware.register(store);

    //send the ui_theme light first
    let action = { type: UI.UI_THEME, payload: 'light'}
    ASSETS.middleware(store)(next)(action);
    expect(mockLoadStyle).toHaveBeenCalledWith("light");

    action = { type: UI.UI_THEME, payload: 'dark'}
    ASSETS.middleware(store)(next)(action);
    expect(mockLoadStyle).toHaveBeenCalledWith("dark");

    action = { type: UI.UI_LANGUAGE, payload: 'es'}
    ASSETS.middleware(store)(next)(action);
    expect(mockLoadLang).toHaveBeenCalledWith("es");

    action = { type: UI.UI_LANGUAGE, payload: 'en'}
    ASSETS.middleware(store)(next)(action);
    expect(mockLoadLang).toHaveBeenCalledWith("en");

    // 4 times should have called next - this is async
    //expect(store.dispatch.mock.calls).toEqual(4);


  });

});
