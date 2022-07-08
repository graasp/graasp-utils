import { DatabasePool, DatabaseTransactionConnection } from 'slonik';
import { FastifyPluginAsync } from 'fastify';

export declare type DatabasePoolHandler = DatabasePool;
export declare type DatabaseTransactionHandler = DatabaseTransactionConnection;

export interface Database {
  pool: DatabasePoolHandler;
}
interface DatabasePluginOptions {
  uri: string;
  logs: boolean;
}
declare const plugin: FastifyPluginAsync<DatabasePluginOptions>;
export default plugin;
