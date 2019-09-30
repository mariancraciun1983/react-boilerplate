/* eslint-disable no-undef */
/// <reference types="jest" />
/// <reference types="jest-fetch-mock" />

import * as API from '../../../../src/frontend/core/middleware/api';
import * as AUTH from '../../../../src/frontend/core/stores/reducers/auth';

const basePath = __CONFIG__.api.path;

// we rely on the fact that these polyfils won't ever be added in js
describe('middlware/api', () => {

  beforeEach(() => {
    fetch.resetMocks()
    API.setToken(null);
  })

  it('handles middleware actions', async () => {
    expect.assertions(4);

    const next = jest.fn();
    const store = jest.fn();

    let action = { type: AUTH.AUTH_SET, payload: { token: '123' }}
    API.middleware(store)(next)(action);
    expect(API.getToken()).toEqual('123');


    action = { type: AUTH.AUTH_UNSET}
    API.middleware(store)(next)(action);
    expect(API.getToken()).toBeNull();

    action = { type: AUTH.AUTH_UPDATE, payload: { token: '123' }}
    API.middleware(store)(next)(action);
    expect(API.getToken()).toEqual('123');

    //3 times should have called next
    expect(next.mock.calls).toHaveLength(3);


  });

  it('does get', async () => {
    expect.assertions(3);
    fetch.mockResponseOnce(JSON.stringify({ data: '123' }));

    const data =  await API.get('/url');
    expect(data).toEqual({ data: '123' });
    expect(fetch.mock.calls).toHaveLength(1)
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/url`);
  });

  it('does post', async () => {
    expect.assertions(4);
    fetch.mockResponseOnce(JSON.stringify({ data: '123' }));

    const data =  await API.post('/url', {1:1});
    expect(data).toEqual({ data: '123' });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/url`);
    expect(fetch.mock.calls[0][1]).toEqual(expect.objectContaining({
      body : JSON.stringify({1:1}),
    }));
  });

  it('does fetch', async () => {
    expect.assertions(4);
    fetch.mockResponseOnce(JSON.stringify({ data: '123' }));

    const data =  await API.request('/url', {1:1});
    expect(data).toEqual({ data: '123' });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/url`);
    expect(fetch.mock.calls[0][1]).toEqual({1:1});
  });


  it('does buildData w/o user token', async () => {
    expect.assertions(4);
    const expected = {
      method : 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    expect(API.buildData('GET')).toEqual(expected);
    expect(API.buildData('POST')).toEqual({...expected, method: 'POST'});
    API.setToken('123');
    const loginExpected = {
      method : 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "x-authentication": "123"
      },
    };
    expect(API.buildData('GET')).toEqual(loginExpected);
    expect(API.buildData('POST')).toEqual({...loginExpected, method: 'POST'});

  });


  it('does genresGet', async () => {
    expect.assertions(2);
    fetch.mockResponseOnce(JSON.stringify({ genres: [1] }));

    const data =  await API.genresGet();
    expect(data).toEqual([1]);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/genres`);
  });

  it('does moviesGet', async () => {
    expect.assertions(2);
    fetch.mockResponseOnce(JSON.stringify({ movies: [1] }));

    const data =  await API.moviesGet();
    expect(data).toEqual([1]);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/movies`);
  });

  it('does authLogin', async () => {
    expect.assertions(2);
    const response = { token: '123', user: {} };
    fetch.mockResponseOnce(JSON.stringify(response));

    const data =  await API.authLogin({user: 'user', pass: 'pass'});
    expect(data).toEqual(response);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/auth/login`);
  });

  it('does register', async () => {
    expect.assertions(2);
    const response = { token: '123', user: {} };
    fetch.mockResponseOnce(JSON.stringify(response));

    const data =  await API.authRegister({user: 'user', pass: 'pass'});
    expect(data).toEqual(response);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/auth/register`);
  });

  it('does token', async () => {
    expect.assertions(2);
    const response = { token: '123', user: {} };
    fetch.mockResponseOnce(JSON.stringify(response));

    const data =  await API.authToken({token: '123'});
    expect(data).toEqual(response);
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/auth/token`);
  });

  it('does cartGet', async () => {
    expect.assertions(2);
    fetch.mockResponseOnce(JSON.stringify({ cart: {} }));

    const data =  await API.cartGet();
    expect(data).toEqual({});
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/cart`);
  });

  it('does cartSave', async () => {
    expect.assertions(2);
    fetch.mockResponseOnce(JSON.stringify({ cart: {} }));

    await API.cartSave();
    expect(fetch.mock.calls[0][0]).toEqual(`${basePath}/cart`);
    expect(fetch.mock.calls[0][1]).toEqual(expect.objectContaining({
      method : 'POST',
    }));
  });



});
