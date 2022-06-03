import { getUrlForRedirection } from './cookie';

interface RedirectOptions {
  openInNewTab?: boolean;
  name?: string;
}
/**
 * @param  {string} url link to redirec to
 * @param  {RedirectOptions} options
 */
export const redirect = (url: string, options?: RedirectOptions) => {
  const { openInNewTab = false, name = '_blank' } = options ?? {};

  if (openInNewTab) {
    window.open(url, name);
  } else {
    window.location.assign(url);
  }
};
/**
 * @param  {string} defaultLink link to redirect to if no url for redirection is defined
 * @param  {RedirectOptions} options
 * @returns {false|void} return false if no redirection has been triggered
 */
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
/**
 * @param  {string} host authentication host
 * @returns {string} sign in path
 */
export const buildSignInPath = ({ host }: { host: string }) => `${host}/signin`;
