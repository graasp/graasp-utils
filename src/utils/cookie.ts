import Cookies from 'js-cookie';

export interface Session {
  id: string;
  token: string;
}

export const COOKIE_KEYS = {
  ACCEPT_COOKIES_KEY: 'accept-all-cookies',
  SESSION_KEY: 'session',
  STORED_SESSIONS_KEY: 'storedSessions',
  REDIRECT_URL_KEY: 'redirectUrl',
};

export const hasAcceptedCookies = () =>
  Cookies.get(COOKIE_KEYS.ACCEPT_COOKIES_KEY) === 'true';

/**
 * @param  {string|null} token token to set in the session key. A null value will remove it.
 */
export const setCurrentSession = (token: string | null, domain: string) => {
  if (!token) {
    return Cookies.remove(COOKIE_KEYS.SESSION_KEY);
  }
  return Cookies.set(COOKIE_KEYS.SESSION_KEY, token, { domain, secure: true });
};

export const getCurrentSession = () => Cookies.get(COOKIE_KEYS.SESSION_KEY);

export const getStoredSessions = (): Session[] =>
  JSON.parse(Cookies.get(COOKIE_KEYS.STORED_SESSIONS_KEY) ?? '[]');

export const storeSession = (payload: Session, domain: string) => {
  const sessions = getStoredSessions();

  // add session if doesn't exist
  if (!sessions.find(({ id }) => id === payload.id)) {
    Cookies.set(
      COOKIE_KEYS.STORED_SESSIONS_KEY,
      JSON.stringify(sessions.concat([payload])),
      { domain, secure: true },
    );
  }
};
export const removeSession = (sId: string, domain: string) => {
  const sessions = getStoredSessions();
  // remove session
  Cookies.set(
    COOKIE_KEYS.STORED_SESSIONS_KEY,
    JSON.stringify(sessions.filter(({ id }) => sId !== id)),
    { domain, secure: true },
  );
};

export const saveUrlForRedirection = (link: string, domain: string) => {
  Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, link, { domain, secure: true });
};

export const getUrlForRedirection = () =>
  Cookies.get(COOKIE_KEYS.REDIRECT_URL_KEY);
