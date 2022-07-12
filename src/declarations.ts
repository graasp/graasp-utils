import { ObjectSchema } from 'fluent-json-schema';

import { Session } from '@fastify/secure-session';

import { Actor, TaskRunner } from './interfaces';
import {
  Database,
  ItemMembershipService,
  ItemMembershipTaskManager,
  ItemService,
  ItemTaskManager,
  Member,
  MemberService,
  MemberTaskManager,
  PublicItemService,
} from './services';
import { PublicItemTaskManager } from './services/public/interfaces/task-manager';

declare module 'fastify' {
  interface FastifyRequest {
    /** member id extracted from auth token when auth is token based (app) */
    memberId: string;

    /**
     * Member and session are available if the user has been authenticated and verified
     */
    member: Member;
    session: Session;
  }

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

    // auth service
    corsPluginOptions: {
      origin: (string | RegExp)[];
      credentials: boolean;
      maxAge: number;
    };
    /**
     * Verify authentication based on session cookie or auth token,
     * extract member from it, and set `request.member`.
     * Throws exception if it fails.
     */
    verifyAuthentication: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Validate session, extract member from it, and set `request.member`.
     * Throws exception if it fails.
     */
    validateSession: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Tries to verify authentication based on session cookie or auth token,
     * extract member from it, and set `request.member`.
     * Does not fail/throw - simply does not set `request.member`.
     */
    attemptVerifyAuthentication: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;

    /**
     * Generate auth+refresh tokens pair for token base auth
     */
    generateAuthTokensPair: (
      memberId: string,
    ) => Promise<{ authToken: string; refreshToken: string }>;

    /** public service
     * graaspActor is a generic user who performs public tasks
     * publicTagId tag id
     */
    public?: {
      graaspActor: Actor;
      publicTagId: string;
      publishedTagId: string;
      items: {
        taskManager: PublicItemTaskManager;
        dbService: PublicItemService;
      };
    };
  }
}
