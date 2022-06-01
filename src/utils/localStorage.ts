export const LOCAL_STORAGE_KEYS = {
  SESSIONS_KEY: 'sessions',
  REDIRECT_URL_KEY: 'redirectUrl',
};

export const getStoredSessions = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SESSIONS_KEY) ?? '[]');

export const addSessionToStorage = (payload: { id: string; token: string }) => {
  const sessions = getStoredSessions();

  localStorage.setItem(
    LOCAL_STORAGE_KEYS.SESSIONS_KEY,
    JSON.stringify(sessions.concat([payload])),
  );
};

export const saveUrlForRedirection = (link: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_URL_KEY, link);
};

export const getUrlForRedirection = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.REDIRECT_URL_KEY);
