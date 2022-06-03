import * as cookieUtils from './cookie';
import Cookies from 'js-cookie';

const MOCK_URL = 'https://example.com';
const DOMAIN = 'domain';
const MOCK_SESSIONS = [
  { id: 'id1', token: 'token1' },
  { id: 'id2', token: 'token2' },
];

const {
  COOKIE_KEYS,
  saveUrlForRedirection,
  hasAcceptedCookies,
  setCurrentSession,
  getCurrentSession,
  getStoredSessions,
  removeSession,
} = cookieUtils;

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.values(COOKIE_KEYS).forEach((key) => {
      Cookies.remove(key);
    });
  });
  describe('hasAcceptedCookies', () => {
    it('check successfully accepted cookies value for true value', () => {
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'true');
      const res = hasAcceptedCookies();
      expect(res).toBeTruthy();
    });
    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'false');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });
    it('check successfully accepted cookies value for false value', () => {
      Cookies.set(COOKIE_KEYS.ACCEPT_COOKIES_KEY, 'null');
      const res = hasAcceptedCookies();
      expect(res).toBeFalsy();
    });
  });
  describe('setCurrentSession', () => {
    const mockToken = 'mockToken';
    it('set given token to the current session cookie', () => {
      const mock = jest.spyOn(Cookies, 'set');
      setCurrentSession(mockToken, DOMAIN);
      expect(mock).toBeCalledWith(COOKIE_KEYS.SESSION_KEY, mockToken, {
        domain: DOMAIN,
        secure: true,
      });
    });
    it('remove token if given token is null', () => {
      const mock = jest.spyOn(Cookies, 'remove');
      setCurrentSession(null, DOMAIN);
      expect(mock).toBeCalledWith(COOKIE_KEYS.SESSION_KEY);
    });
  });
  describe('getCurrentSession', () => {
    it('check successfully session token value', () => {
      Cookies.set(COOKIE_KEYS.SESSION_KEY, 'value');
      const res = getCurrentSession();
      expect(res).toEqual('value');
    });
  });
  describe('getStoredSessions', () => {
    it('get successfully stored sessions', () => {
      Cookies.set(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(MOCK_SESSIONS),
      );
      const res = getStoredSessions();
      expect(res).toEqual(MOCK_SESSIONS);
    });
    it('return empty array if stored sessions cookie is empty', () => {
      const res = getStoredSessions();
      expect(res).toEqual([]);
    });
    it('return empty array if stored sessions value is corrupted', () => {
      Cookies.set(COOKIE_KEYS.STORED_SESSIONS_KEY, 'weifojkn');
      const res = getStoredSessions();
      expect(res).toEqual([]);
    });
  });
  describe('removeSession', () => {
    it('remove successfully first stored session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession(MOCK_SESSIONS[0].id, DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify([MOCK_SESSIONS[1]]),
        { domain: DOMAIN, secure: true },
      );
    });
    it('remove successfully second stored session', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession(MOCK_SESSIONS[1].id, DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify([MOCK_SESSIONS[0]]),
        { domain: DOMAIN, secure: true },
      );
    });
    it('does not remove if id is not found', () => {
      jest
        .spyOn(cookieUtils, 'getStoredSessions')
        .mockReturnValue(MOCK_SESSIONS);
      const mock = jest.spyOn(Cookies, 'set');
      removeSession('someid', DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.STORED_SESSIONS_KEY,
        JSON.stringify(MOCK_SESSIONS),
        { domain: DOMAIN, secure: true },
      );
    });
  });
  describe('saveUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      const mock = jest.spyOn(Cookies, 'set');
      saveUrlForRedirection(MOCK_URL, DOMAIN);
      expect(mock).toHaveBeenCalledWith(
        COOKIE_KEYS.REDIRECT_URL_KEY,
        MOCK_URL,
        { domain: DOMAIN, secure: true },
      );
    });
  });
  describe('getUrlForRedirection', () => {
    it('save link for redirection in cookie', () => {
      Cookies.set(COOKIE_KEYS.REDIRECT_URL_KEY, MOCK_URL);
      const res = cookieUtils.getUrlForRedirection();
      expect(res).toEqual(MOCK_URL);
    });
  });
});
