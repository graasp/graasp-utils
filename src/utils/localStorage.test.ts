import { LOCAL_STORAGE_KEYS, saveUrlForRedirection } from './localStorage';

const DEFAULT_URL = 'https://example.com';

describe('Navigation Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('saveUrlForRedirection', () => {
    it('save successfully given pathname', () => {
      saveUrlForRedirection(DEFAULT_URL);
      expect(localStorage.setItem).toBeCalledWith(
        LOCAL_STORAGE_KEYS.REDIRECT_URL_KEY,
        DEFAULT_URL,
      );
    });
  });
});
