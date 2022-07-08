import { MemberService } from './db-service';
import { MemberTaskManager } from './interfaces/member-task-manager';

export * from './db-service';
export * from './interfaces/member';
export * from './interfaces/member-task-manager';

declare module 'fastify' {
  interface FastifyInstance {
    members: {
      taskManager: MemberTaskManager;
      dbService: MemberService;
    };
  }
}
