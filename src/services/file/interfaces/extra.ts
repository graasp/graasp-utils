import { UnknownExtra } from '../../../interfaces';

export interface FileProperties {
  name: string;
  path: string;
  mimetype: string;
}

export interface LocalFileItemExtra extends UnknownExtra {
  file: FileProperties;
}

export interface S3FileItemExtra extends UnknownExtra {
  s3File: FileProperties;
}

export type FileItemExtra = S3FileItemExtra | LocalFileItemExtra;
