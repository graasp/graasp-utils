import { isPseudonymizedMember, PSEUDONYMIZED_USER_MAIL } from './member';

describe('Member Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('isPseudonymizedMember', () => {
    it('check successfully member is pseudonymized for false values', () => {
      const res1 = isPseudonymizedMember('mail');
      expect(res1).toBeFalsy();
      const res2 = isPseudonymizedMember('mail@email.org');
      expect(res2).toBeFalsy();
    });
    it('check successfully member is pseudonymized for true values', () => {
      const res1 = isPseudonymizedMember(`mail@${PSEUDONYMIZED_USER_MAIL}`);
      expect(res1).toBeTruthy();
    });
  });
});
