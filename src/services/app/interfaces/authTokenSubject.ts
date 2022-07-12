export interface AppIdentification {
  app: string;
}

export type AuthTokenSubject = {
  member: string;
  item: string;
  origin: string;
} & AppIdentification; // from the graasp client/app wrapper // from the app itself
