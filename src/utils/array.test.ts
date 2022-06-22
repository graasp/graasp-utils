import { partition } from './array';
const mockArray = [0, 1, 2, 3, 4, 5];

describe('Array utils', () => {
  describe('partition', () => {
    it('Successfully split array', () => {
      const result = partition(mockArray, (el) => el < 4);
      expect(result).toEqual([
        [0, 1, 2, 3],
        [4, 5],
      ]);

      const result1 = partition(mockArray, (el) => el > -1);
      expect(result1).toEqual([[0, 1, 2, 3, 4, 5], []]);

      const result2 = partition(mockArray, (el) => el < -1);
      expect(result2).toEqual([[], [0, 1, 2, 3, 4, 5]]);
    });
  });
});
