import { ObjectSchema } from 'fluent-json-schema';

import { ItemService, ItemTaskManager } from './items';

export * from './item-memberships';
export * from './items';
export * from './members';
export * from './database';

declare module 'fastify' {
  interface FastifyInstance {
    items: {
      taskManager: ItemTaskManager;
      dbService: ItemService;
      extendCreateSchema: (itemTypeSchema?: ObjectSchema) => void;
      extendExtrasUpdateSchema: (itemTypeSchema?: ObjectSchema) => void;
    };
  }
}
