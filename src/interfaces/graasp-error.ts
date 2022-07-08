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
