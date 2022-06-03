export const PSEUDONYMIZED_USER_MAIL = '@graasp.org';

export const isPseudonymizedMember = (email: string) =>
  email.includes(PSEUDONYMIZED_USER_MAIL);
