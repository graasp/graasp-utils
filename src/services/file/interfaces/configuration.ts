import S3 from 'aws-sdk/clients/s3';

export interface S3FileConfiguration {
  s3Region: string;
  s3Bucket: string;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;
  s3UseAccelerateEndpoint?: boolean;
  s3Expiration?: number;
  s3Instance?: S3;
}

export interface LocalFileConfiguration {
  storageRootPath: string;
}
