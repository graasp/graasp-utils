import { PermissionLevel } from '../../../constants';
import { Actor } from '../../../interfaces/actor';
import { Task } from '../../../interfaces/task';
import { Item } from '../../items/interfaces/item';
import { ItemMembership } from './item-membership';

export interface ItemMembershipTaskManager<A extends Actor = Actor> {
  getCreateTaskName(): string;
  getGetTaskName(): string;
  getUpdateTaskName(): string;
  getDeleteTaskName(): string;
  getGetOfItemTaskName(): string;

  createCreateTask(
    actor: A,
    data: Partial<ItemMembership>,
  ): Task<A, ItemMembership>;
  createCreateTaskSequence(
    actor: A,
    object: Partial<ItemMembership>,
    extra?: unknown,
  ): Task<A, unknown>[];
  createGetTask(actor: A, objectId: string): Task<A, ItemMembership>;
  createUpdateTaskSequence(
    actor: A,
    objectId: string,
    object: Partial<ItemMembership>,
  ): Task<A, unknown>[];
  createDeleteTaskSequence(
    actor: A,
    objectId: string,
    extra?: unknown,
  ): Task<A, unknown>[];
  createGetOfItemTask(member: A, item?: Item): Task<A, unknown>;
  createGetOfManyItemsTask(
    member: A,
    items?: Item[],
    shouldValidatePermission?: boolean,
  ): Task<A, unknown>;
  createGetOfItemTaskSequence(actor: A, itemId: string): Task<A, unknown>[];
  createDeleteAllOnAndBelowItemTaskSequence(
    actor: A,
    itemId: string,
  ): Task<A, unknown>[];
  createGetMemberItemMembershipTask(
    actor: A,
    input?: { item?: Item; validatePermission?: PermissionLevel },
  ): Task<A, ItemMembership>;
  createGetAdminMembershipTaskSequence(
    actor: A,
    itemId: string,
  ): Task<A, unknown>[];
  createCreateSubTaskSequence(
    actor: A,
    input: { data?: Partial<ItemMembership>; item?: Item },
  ): Task<A, unknown>[];
}
