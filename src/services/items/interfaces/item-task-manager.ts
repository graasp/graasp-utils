import { Actor } from '../../../interfaces/actor';
import { UnknownExtra } from '../../../interfaces/extra';
import { Task } from '../../../interfaces/task';
import { Item } from './item';

export interface ItemTaskManager<A extends Actor = Actor> {
  getCreateTaskName(): string;
  getGetTaskName(): string;
  getGetManyTaskName(): string;
  getUpdateTaskName(): string;
  getDeleteTaskName(): string;
  getMoveTaskName(): string;
  getCopyTaskName(): string;
  getGetChildrenTaskName(): string;
  getGetOwnTaskName(): string;
  getGetSharedWithTaskName(): string;
  getGetDescendantsTaskName(): string;

  createCreateTaskSequence(
    actor: A,
    object: Partial<Item>,
    extra?: unknown,
  ): Task<A, unknown>[];
  createGetTask<E extends UnknownExtra>(
    actor: A,
    objectId: string,
  ): Task<Actor, Item<E>>;
  createGetTaskSequence(actor: A, objectId: string): Task<Actor, unknown>[];
  createUpdateTaskSequence(
    actor: A,
    objectId: string,
    object: Partial<Item>,
  ): Task<A, unknown>[];
  createDeleteTask(actor: A, item?: Item): Task<A, unknown>;
  createDeleteTaskSequence(
    actor: A,
    objectId: string,
    extra?: unknown,
  ): Task<A, unknown>[];
  createMoveTaskSequence(
    actor: Actor,
    itemId: string,
    parentId?: string,
  ): Task<A, unknown>[];
  createCopyTaskSequence(
    actor: Actor,
    itemId: string,
    options: { parentId?: string; shouldCopyTags?: boolean },
  ): Task<A, unknown>[];
  createCopySubTaskSequence(
    actor: Actor,
    itemTask: Task<A, Item>,
    options: { parentId?: string; shouldCopyTags?: boolean },
  ): Task<A, unknown>[];
  createGetChildrenTask(
    actor: Actor,
    input: { item?: Item; ordered?: boolean },
  ): Task<A, Item<UnknownExtra>[]>;
  createGetChildrenTaskSequence(
    actor: Actor,
    itemId: string,
    ordered?: boolean,
  ): Task<A, unknown>[];
  createGetOwnTask(actor: Actor): Task<A, Item[]>;
  createGetSharedWithTask(
    actor: Actor,
    input: { permissions?: string[] },
  ): Task<A, Item[]>;
  createGetDescendantsTask(
    member: Actor,
    input?: { item: Item },
  ): Task<A, Item[]>;
  createGetManyTask(member: Actor, itemIds?: string[]): Task<Actor, unknown>;
}
