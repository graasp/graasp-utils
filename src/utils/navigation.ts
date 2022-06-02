import qs from 'qs';
import { getUrlForRedirection } from './cookie';

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

export const redirectToSavedUrl = (
  defaultLink?: string,
  options?: RedirectOptions,
) => {
  const link = getUrlForRedirection();
  if (link) {
    return redirect(link, options);
  }
  if (defaultLink) {
    return redirect(defaultLink, options);
  }

  return false;
};

export const redirectToSignIn = ({ host, to }: { host: string; to?: string }) =>
  `${host}/signin${qs.stringify({ to }, { addQueryPrefix: true })}`;
