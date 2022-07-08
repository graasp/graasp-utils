import { ItemMembershipService } from './db-service';
import { ItemMembershipTaskManager } from './interfaces/item-membership-task-manager';

export * from './db-service';
export * from './interfaces/item-membership';
export * from './interfaces/item-membership-task-manager';

declare module 'fastify' {
  interface FastifyInstance {
    itemMemberships: {
      taskManager: ItemMembershipTaskManager;
      dbService: ItemMembershipService;
    };
  }
}
