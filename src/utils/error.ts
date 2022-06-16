/**
 * This util function detects if the returned object is an error
 * We often need to define those errors within a requested array of multiple instances
 * @param  {any} obj object to evaluate
 * @returns {boolean} whether the object is an error
 */
export const isError = (obj: any) => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  return 'statusCode' in obj;
};
