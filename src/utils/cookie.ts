import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  ACCEPT_COOKIES_KEY: 'accept-all-cookies',
  SESSION_KEY: 'session',
};

export const hasAcceptedCookies = () =>
  Cookies.get(COOKIE_KEYS.ACCEPT_COOKIES_KEY) === 'true';

/**
 * @param  {string|null} token token to set in the session key. A null value will remove it.
 */
export const setSessionCookie = (token: string | null, domain: string) => {
  if (!token) {
    return Cookies.remove(COOKIE_KEYS.SESSION_KEY);
  }
  return Cookies.set(COOKIE_KEYS.SESSION_KEY, token, { domain });
};

export const getSessionCookie = () => Cookies.get(COOKIE_KEYS.SESSION_KEY);
