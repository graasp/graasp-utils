import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  ACCEPT_COOKIES_KEY: 'accept-all-cookies',
  SESSION_KEY: 'session',
};

export const hasAcceptedCookies = () =>
  Cookies.get(COOKIE_KEYS.ACCEPT_COOKIES_KEY) === 'true';

export const setSessionCookie = (token: string) => {
  Cookies.set(COOKIE_KEYS.SESSION_KEY, token);
};

export const getSessionCookie = () => {
  Cookies.get(COOKIE_KEYS.SESSION_KEY);
};
