import { COOKIE_KEYS, saveUrlForRedirection } from './cookie';

const DEFAULT_URL = 'https://example.com';
const DOMAIN = 'domain';

describe('Cookie Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('saveUrlForRedirection', () => {
    it('save successfully given pathname', () => {
      saveUrlForRedirection(DEFAULT_URL, DOMAIN);
      expect(localStorage.setItem).toBeCalledWith(
        COOKIE_KEYS.REDIRECT_URL_KEY,
        DEFAULT_URL,
      );
    });
  });
});
