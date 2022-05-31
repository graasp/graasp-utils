import { REDIRECT_URL_LOCAL_STORAGE_KEY } from '../constants/constants';
import {
  redirect,
  redirectToSavedUrl,
  saveUrlForRedirection,
} from './navigation';

const DEFAULT_URL = 'https://example.com';

describe('Navigation Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('redirect', () => {
    it('redirect successfully for default values', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      redirect(DEFAULT_URL);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL);
    });
    it('redirect successfully in new tab with name', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      redirect(DEFAULT_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL, args.name);
    });
  });

  describe('saveUrlForRedirection', () => {
    it('save successfully given pathname', () => {
      saveUrlForRedirection(DEFAULT_URL);
      expect(localStorage.setItem).toBeCalledWith(
        REDIRECT_URL_LOCAL_STORAGE_KEY,
        DEFAULT_URL,
      );
    });
  });

  describe('redirectToSavedUrl', () => {
    it('redirect successfully to saved link', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      jest.spyOn(localStorage, 'getItem').mockReturnValue(DEFAULT_URL);
      redirectToSavedUrl();
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL);
    });
    it('redirect successfully to default link', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
      redirectToSavedUrl(DEFAULT_URL);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL);
    });
    it('redirect successfully to saved link in new tab', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      jest.spyOn(localStorage, 'getItem').mockReturnValue(DEFAULT_URL);
      redirectToSavedUrl('mock-url', args);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL, args.name);
    });
    it('redirect successfully to default link in new tab', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      redirectToSavedUrl(DEFAULT_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL, args.name);
    });
  });
});
