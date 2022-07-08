import { FastifyLoggerInstance } from 'fastify';

import { DatabaseTransactionHandler } from '../services/database';
import { Actor } from './actor';

export type IndividualResultType<T> = T extends (infer E)[] ? E : T;

export enum TaskStatus {
  NEW = 'NEW',
  RUNNING = 'RUNNING',
  OK = 'OK',
  FAIL = 'FAIL',
  DELEGATED = 'DELEGATED',
}

export interface Task<A extends Actor, T> {
  readonly name: string;
  readonly actor: A;
  targetId?: string;
  data?: Partial<IndividualResultType<T>>;
  status: TaskStatus;
  readonly result: T;
  readonly message?: string;
  readonly partialSubtasks?: boolean;
  run(
    handler: DatabaseTransactionHandler,
    log: FastifyLoggerInstance,
  ): Promise<void | Task<A, T>[]>;
  preHookHandler?: PreHookHandlerType<T>;
  postHookHandler?: PostHookHandlerType<T>;
  /**
   * When in a sequence of tasks, this signals how many tasks should be skipped,
   * itself included (ex: 1 - skip itself; 2 - skip itself and the next)
   */
  skip?: boolean;
  input?: unknown;
  /**
   * To to fetch and overwrite any values in the task's input
   */
  getInput?: () => unknown;
  /**
   * To get a modified "version" of what this task's result should be
   */
  getResult?: () => unknown;
}
export interface TaskHookHandlerHelpers {
  log: FastifyLoggerInstance;
  handler?: DatabaseTransactionHandler;
}
export type PreHookHandlerType<T, K = unknown> = (
  data: Partial<IndividualResultType<T>>,
  actor: Actor,
  helpers: TaskHookHandlerHelpers,
  extraData?: K,
) => Promise<void> | void;
export type PostHookHandlerType<T, K = unknown> = (
  data: T,
  actor: Actor,
  helpers: TaskHookHandlerHelpers,
  extraData?: K,
) => Promise<void> | void;
