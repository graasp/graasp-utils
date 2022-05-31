import { REDIRECT_URL_LOCAL_STORAGE_KEY } from '../constants/constants';

interface RedirectOptions {
  openInNewTab?: boolean;
  name?: string;
}

export const redirect = (url: string, options?: RedirectOptions) => {
  const { openInNewTab = false, name = '_blank' } = options ?? {};

  if (openInNewTab) {
    window.open(url, name);
  } else {
    window.location.assign(url);
  }
};

export const saveUrlForRedirection = (link: string) => {
  localStorage.setItem(REDIRECT_URL_LOCAL_STORAGE_KEY, link);
};

export const redirectToSavedUrl = (
  defaultLink?: string,
  options?: RedirectOptions,
) => {
  const link = localStorage.getItem(REDIRECT_URL_LOCAL_STORAGE_KEY);
  if (link) {
    return redirect(link, options);
  }
  if (defaultLink) {
    return redirect(defaultLink, options);
  }

  return false;
};
