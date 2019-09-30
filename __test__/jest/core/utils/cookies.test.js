/// <reference types="jest" />

import { getCookie, setCookie, deleteCookie } from '../../../../src/frontend/core/utils/cookies';

let mockGetCookie = jest.fn();
let mockSetCookie = jest.fn();
let mockDeleteCookie = jest.fn();

jest.mock('js-cookie', () => ({
    __esModule: true, // mock the exports
    default: {
        set: jest.fn().mockImplementation((...args) => {
            mockSetCookie(...args);
        }),
        get: jest.fn().mockImplementation((...args) => {
            mockGetCookie(...args);
        }),
        remove: jest.fn().mockImplementation((...args) => {
          mockDeleteCookie(...args);
        }),

    },
}));

describe('utils/cookies', () => {
  it('is should handle set/get/delete', () => {
    expect.assertions(3);
    setCookie('key','value')
    expect(mockSetCookie).toHaveBeenCalledWith("key", "value", {"domain": ".localhost", "expires": 7, "path": "/"});
    getCookie('key')
    expect(mockGetCookie).toHaveBeenCalledWith("key");
    deleteCookie('key')
    expect(mockDeleteCookie).toHaveBeenCalledWith("key", {"domain": ".localhost", "path": "/"});
  });

});
