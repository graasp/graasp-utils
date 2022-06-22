/**
 * Split array in two parts given condition
 * @param  {unknown[]} array
 * @param  {(unknown, number): boolean} condition
 */
export const partition = <A = unknown>(
  array: A[],
  condition: (element: A, idx: number) => boolean,
) =>
  array.reduce(
    (result: A[][], element, idx) => {
      result[condition(element, idx) ? 0 : 1].push(element);
      return result;
    },
    [[], []],
  );
