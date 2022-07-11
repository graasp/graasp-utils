import { ObjectSchema } from 'fluent-json-schema';
import {
  Database,
  ItemMembershipService,
  ItemMembershipTaskManager,
  ItemService,
  ItemTaskManager,
  MemberService,
  MemberTaskManager,
} from './services';
import { Actor, TaskRunner } from './interfaces';

declare module 'fastify' {
  interface FastifyInstance {
    // database
    db: Database;

    // task runner
    taskRunner: TaskRunner<Actor>;

    // item service
    items: {
      taskManager: ItemTaskManager;
      dbService: ItemService;
      extendCreateSchema: (itemTypeSchema?: ObjectSchema) => void;
      extendExtrasUpdateSchema: (itemTypeSchema?: ObjectSchema) => void;
    };

    // item membership service
    itemMemberships: {
      taskManager: ItemMembershipTaskManager;
      dbService: ItemMembershipService;
    };

    // member service
    members: {
      taskManager: MemberTaskManager;
      dbService: MemberService;
    };
  }
}
