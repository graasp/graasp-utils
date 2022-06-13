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
/**
 * @returns {boolean} whether the user accepted the cookies
 */
export const hasAcceptedCookies = () =>
  Cookies.get(COOKIE_KEYS.ACCEPT_COOKIES_KEY) === 'true';

/**
 * @param {string|null} token token to set in the session key. A null value will remove it.
 * @param  {string} domain value for the cookie's domain
 */
export const setCurrentSession = (token: string | null, domain: string) => {
  if (!token) {
    return Cookies.remove(COOKIE_KEYS.SESSION_KEY, { domain });
  }
  return Cookies.set(COOKIE_KEYS.SESSION_KEY, token, { domain, secure: true });
};
/**
 * @returns {string|undefined} current session token
 */
export const getCurrentSession = () => Cookies.get(COOKIE_KEYS.SESSION_KEY);

/**
 * @returnss {Session[]} stored sessions
 */
export const getStoredSessions = (): Session[] => {
  try {
    return JSON.parse(Cookies.get(COOKIE_KEYS.STORED_SESSIONS_KEY) ?? '[]');
  } catch (e) {
    return [];
  }
};

/**
 * @param  {Session} session session to store
 * @param  {string} domain value for the cookie's domain
 */
export const storeSession = (session: Session, domain: string) => {
  const sessions = getStoredSessions();

  // add session if doesn't exist
  if (!sessions.find(({ id }) => id === session.id)) {
    Cookies.set(
      COOKIE_KEYS.STORED_SESSIONS_KEY,
      JSON.stringify(sessions.concat([session])),
      { domain, secure: true },
    );
  }
};
/**
 * @param  {string} sId session id to remove
 * @param  {string} domain value for the cookie's domain
 */
export const removeSession = (sId: string, domain: string) => {
  const sessions = getStoredSessions();

  // remove session
  Cookies.set(
    COOKIE_KEYS.STORED_SESSIONS_KEY,
    JSON.stringify(sessions.filter(({ id }) => sId !== id)),
    { domain, secure: true },
  );
};
/**
 * @param  {string} link link to save for further redirection
 * @param  {string} domain value for the cookie's domain
 */
export const saveUrlForRedirection = (link: string, domain: string) => {
  Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, link, { domain, secure: true });
};
/**
 * @returns  {string|undefined} link saved for further redirection
 */
export const getUrlForRedirection = () =>
  Cookies.get(COOKIE_KEYS.REDIRECT_URL_KEY);
