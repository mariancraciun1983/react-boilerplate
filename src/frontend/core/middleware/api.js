/* eslint-disable max-len */

import * as AUTH from '../stores/reducers/auth';

// eslint-disable-next-line no-undef
const basePath = __CONFIG__.api.path;

let token;

export const middleware = () => (next) => (action) => {
  const result = next(action);
  /* istanbul ignore else  */
  if (action.type === AUTH.AUTH_SET || action.type === AUTH.AUTH_UPDATE) {
    token = action.payload.token;
  } else if (action.type === AUTH.AUTH_UNSET) {
    token = null;
  }
  /* istanbul igore else  */
  return result;
};

export const setToken = (_token) => {
  token = _token;
};

export const getToken = () => token;

export const request = async (url, data) => {
  const response = await fetch(`${basePath}${url}`, data);
  return response.json();
};

export const buildData = (method = 'GET') => {
  const data = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    data.headers['x-authentication'] = token;
  }
  return data;
};

export const get = async (url) => {
  const data = buildData();
  return request(url, data);
};

export const post = async (url, body) => {
  const data = buildData('POST');
  data.body = JSON.stringify(body);
  return request(url, data);
};

export const genresGet = async () => {
  const result = await get('/genres');
  return result.genres;
};

export const moviesGet = async () => {
  const result = await get('/movies');
  return result.movies;
};

export const authLogin = async (body) => {
  const result = await post('/auth/login', body);
  return result;
};

export const authRegister = async (body) => {
  const result = await post('/auth/register', body);
  return result;
};

export const authToken = async (body) => {
  const result = await post('/auth/token', body);
  return result;
};

export const cartGet = async () => {
  const result = await get('/cart');
  return result.cart;
};

export const cartSave = async (body) => {
  const result = await post('/cart', body);
  return result;
};
