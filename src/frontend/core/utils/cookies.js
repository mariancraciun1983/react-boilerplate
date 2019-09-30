import Cookies from 'js-cookie';

const domain = `.${window.location.hostname}`;
const defaultCookieExpiration = 7; // 7 days

export const getCookie = (name, def = null) => (
  Cookies.get(name) || def
);
export const setCookie = (name, value, ttl = defaultCookieExpiration) => {
  Cookies.set(name, value, { expires: ttl, path: '/', domain });
};

export const deleteCookie = (name) => {
  Cookies.remove(name, { path: '/', domain });
};
