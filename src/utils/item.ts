export const buildPathFromIds = (...ids: string[]): string => {
  return ids.join('.').replace(/-/g, '_');
};

export const getIdsFromPath = (path: string): string[] =>
  path.replace(/_/g, '-').split('.');

// helper function to find parent of item given path
export function getParentFromPath(itemPath: string): string | undefined {
  const ids = getIdsFromPath(itemPath);
  return ids.length >= 2 ? ids[ids.length - 2] : undefined;
}

// helper function to extract child ID from item path
export function getChildFromPath(itemPath: string): string {
  const ids = getIdsFromPath(itemPath);
  return ids[ids.length - 1];
}
