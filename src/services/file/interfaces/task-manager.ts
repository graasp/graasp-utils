import { ReadStream } from 'fs';

import { FastifyReply } from 'fastify';

import { Actor, Task } from '../../../interfaces';

export interface FileTaskManager<A extends Actor = Actor> {
  getUploadFileTaskName(): string;
  getDownloadFileTaskName(): string;

  createUploadFileTask(
    member: A,
    data?: {
      file?: ReadStream;
      filepath?: string;
      mimetype?: string;
      size?: number;
    },
  ): Task<A, unknown>;

  createDownloadFileTask(
    member: A,
    data: {
      reply?: FastifyReply;
      filepath?: string;
      itemId?: string;
      mimetype?: string;
      fileStorage?: string;
      expiration?: number;
    },
  ): Task<A, unknown>;

  createDeleteFileTask(
    member: A,
    data: {
      filepath?: string;
    },
  ): Task<A, unknown>;

  createDeleteFolderTask(
    member: A,
    data: {
      folderPath?: string;
    },
  ): Task<A, unknown>;

  createCopyFileTask(
    member: A,
    data?: {
      newId?: string;
      newFilePath?: string;
      originalPath?: string;
      mimetype?: string;
    },
  ): Task<A, unknown>;

  createCopyFolderTask(
    member: A,
    data: {
      originalFolderPath: string;
      newFolderPath: string;
    },
  ): Task<A, unknown>;
}
