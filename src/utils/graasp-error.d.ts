import { FastifyError } from 'fastify';

declare type ErrorOrigin = 'core' | 'plugin' | 'unknown' | string;
export interface GraaspError extends FastifyError {
  data?: unknown;
  origin: ErrorOrigin;
}
export interface GraaspErrorDetails {
  code: string;
  message: string;
  statusCode: number;
}
export declare abstract class BaseGraaspError implements GraaspError {
  name: string;
  code: string;
  statusCode?: number;
  message: string;
  data?: unknown;
  origin: ErrorOrigin;
  constructor(
    { code, statusCode, message }: GraaspErrorDetails,
    data?: unknown,
  );
}
export declare class ItemNotFound extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class MemberCannotReadItem extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class MemberCannotWriteItem extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class MemberCannotAdminItem extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class InvalidMembership extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class ItemMembershipNotFound extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class ModifyExisting extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class InvalidPermissionLevel extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class HierarchyTooDeep extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class TooManyChildren extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class TooManyDescendants extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class InvalidMoveTarget extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class MemberNotFound extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class CannotModifyOtherMembers extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class TooManyMemberships extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class MemberCannotAccess extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class DatabaseError extends BaseGraaspError {
  constructor(data?: unknown);
}
export declare class UnexpectedError extends BaseGraaspError {
  constructor(data?: unknown);
}
export {};
