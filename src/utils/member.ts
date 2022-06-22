export const PSEUDONYMIZED_USER_MAIL_REGEX =
  /[a-zA-Z0-9]{4}\-[0-9]{13}\@graasp\.org/;

export const isPseudonymizedMember = (email: string) =>
  PSEUDONYMIZED_USER_MAIL_REGEX.test(email.toLowerCase());
