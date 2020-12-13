import { Injectable } from '@nestjs/common';
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  s3Client: S3;

  constructor(private config: ConfigService) {
    this.s3Client = new S3({
      region: config.get<string>('AWS_REGION') || 'eu-central-1',
    });
  }

  list(bucket: string) {
    return this.s3Client.listObjectsV2({ Bucket: bucket }).promise();
  }

  fetch(bucket: string, key: string) {
    return this.s3Client
      .getObject({ Bucket: bucket, Key: key })
      .createReadStream();
  }

  put(bucket: string, key: string, body: S3.Body) {
    return this.s3Client
      .putObject({ Bucket: bucket, Key: key, Body: body })
      .promise();
  }
}
