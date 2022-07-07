import { buildPathFromId, getIdsFromPath } from './item';

describe('Item Utils', () => {
  describe('buildPathFromId', () => {
    it('Build correct paths for values', () => {
      const oneId = 'cc7ad362-c220-4232-a474-decae17371ad';
      const onePath = buildPathFromId(oneId);
      expect(onePath).toEqual('cc7ad362_c220_4232_a474_decae17371ad');
    });
  });

  describe('getIdsFromPath', () => {
    it('Get one id', () => {
      const pathWithOneId = 'cc7ad362_c220_4232_a474_decae17371ad';
      const oneId = getIdsFromPath(pathWithOneId);
      expect(oneId).toContain('cc7ad362-c220-4232-a474-decae17371ad');
    });

    it('Get three ids', () => {
      const pathWithThreeIds =
        'cc7ad362_c220_4232_a474_decae17371ad.cc7ad362_c220_4232_a474_decae17371a3.cc7ad362_c220_4232_a474_decae17371a2';
      const threeIds = getIdsFromPath(pathWithThreeIds);
      expect(threeIds).toEqual([
        'cc7ad362-c220-4232-a474-decae17371ad',
        'cc7ad362-c220-4232-a474-decae17371a3',
        'cc7ad362-c220-4232-a474-decae17371a2',
      ]);
    });
  });
});
