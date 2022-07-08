import { DatabasePool, DatabaseTransactionConnection } from 'slonik';

export declare type DatabasePoolHandler = DatabasePool;
export declare type DatabaseTransactionHandler = DatabaseTransactionConnection;

export interface Database {
  pool: DatabasePoolHandler;
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
  }
}
