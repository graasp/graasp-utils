import { Item } from '../services';

/**
 * @param ids consecutive item ids
 * @returns path of consecutive items
 */
export const buildPathFromIds = (...ids: string[]): string => {
  return ids.join('.').replace(/-/g, '_');
};
/**
 * @param  {string} path item's path
 * @returns ids array
 */
export const getIdsFromPath = (path: string): string[] =>
  path.replace(/_/g, '-').split('.');

/**
 *  helper function to find parent of item given path
 * @param  {string} itemPath
 * @returns string
 */
export function getParentFromPath(itemPath: string): string | undefined {
  const ids = getIdsFromPath(itemPath);
  return ids.length >= 2 ? ids[ids.length - 2] : undefined;
}

/**
 * helper function to extract child ID from item path
 * @param  {string} itemPath item's path
 * @returns children ids
 */
export function getChildFromPath(itemPath: string): string {
  const ids = getIdsFromPath(itemPath);
  return ids[ids.length - 1];
}

/**
 * @param  {string} path item path
 * @param  {string} parentPath parent path
 * @returns whether item is child of given parent
 */
export const isChildOf = (path: string, parentPath: string) => {
  const reg = new RegExp(`${parentPath}(?=\\.[^\\.]*$)`);
  return path.match(reg);
};

/**
 * @param  {Item} item
 * @returns whether the item is a root
 */
export const isRootItem = ({ path }: Item) => path.includes('.');
