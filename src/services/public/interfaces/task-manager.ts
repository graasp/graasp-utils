import { Actor, Task } from '../../../interfaces';
import { Item } from '../../items';

export interface PublicItemTaskManager<A extends Actor = Actor> {
  createFilterPublicItemsTaskName(): string;
  createGetPublicItemTaskName(): string;
  createGetManyPublicItemsTaskName(): string;
  createGetPublicItemIdsByTagsTaskName(): string;

  createFilterPublicItemsTask(
    member: Actor,
    input: {
      items?: Item[];
      tagIds?: string[];
    },
  ): Task<A, readonly Item[]>;

  createGetPublicItemTask(
    member: Actor,
    input: {
      itemId: string;
    },
  ): Task<A, Item>;

  createGetManyPublicItemsTask(
    member: Actor,
    input: {
      itemIds: string[];
    },
  ): Task<A, unknown[]>;

  createGetPublicItemIdsByTagsTask(
    member: Actor,
    input: { tagIds: string[] },
  ): Task<A, readonly string[]>;
}
