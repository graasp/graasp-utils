export const LOCAL_STORAGE_KEYS = {
  SESSIONS_KEY: 'sessions',
  REDIRECT_URL_KEY: 'redirectUrl',
};

interface Session {
  id: string;
  token: string;
}

export const getStoredSessions = (): Session[] =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SESSIONS_KEY) ?? '[]');

export const addSessionToStorage = (payload: Session) => {
  const sessions = getStoredSessions();

  // add session if doesn't exist
  if (!sessions.find(({ id }) => id === payload.id)) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.SESSIONS_KEY,
      JSON.stringify(sessions.concat([payload])),
    );
  }
};

export const saveUrlForRedirection = (link: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_URL_KEY, link);
};

export const getUrlForRedirection = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.REDIRECT_URL_KEY);
