import { FastifyLoggerInstance } from 'fastify';
import { DatabaseTransactionHandler } from '../services';
import { Actor } from './actor';
import {
  IndividualResultType,
  PostHookHandlerType,
  PreHookHandlerType,
  Task,
  TaskStatus,
} from './task';

export abstract class BaseTask<A extends Actor, R> implements Task<A, R> {
  protected _result?: R;
  protected _message?: string;
  readonly actor: A;
  protected _partialSubtasks?: boolean;

  status: TaskStatus;
  targetId?: string;
  data?: Partial<IndividualResultType<R>>;
  preHookHandler?: PreHookHandlerType<R>;
  postHookHandler?: PostHookHandlerType<R>;

  getInput?: () => unknown;
  getResult?: () => unknown;

  constructor(actor: A) {
    this.actor = actor;
    this.status = TaskStatus.NEW;
  }

  abstract get name(): string;
  get result(): R | undefined {
    return this._result;
  }
  get message(): string | undefined {
    return this._message;
  }
  get partialSubtasks(): boolean | undefined {
    return this._partialSubtasks;
  }

  input?: unknown;
  skip?: boolean;

  abstract run(
    handler: DatabaseTransactionHandler,
    log: FastifyLoggerInstance,
  ): Promise<void | BaseTask<A, R>[]>;
}
