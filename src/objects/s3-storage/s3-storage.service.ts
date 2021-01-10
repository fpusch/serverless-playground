import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { S3PreSignedRequest } from './s3-pre-signed-request';

@Injectable()
export class S3StorageService {
  s3Client: S3Client;

  constructor(config: ConfigService) {
    this.s3Client = new S3Client({
      region: config.get<string>('AWS_REGION') || 'eu-central-1',
    });
  }

  list(bucket: string) {
    const command = new ListObjectsV2Command({ Bucket: bucket });
    return this.s3Client.send(command);
  }

  async exists(bucket: string, key: string) {
    try {
      const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPreSignedGetObjectUrl(bucket: string, key: string) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 60 });
    return new S3PreSignedRequest(
      'getObject',
      command.input.Bucket,
      command.input.Key,
      60,
      url,
    );
  }

  async getPreSignedPutObjectUrl(bucket: string, key: string) {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 60 });
    return new S3PreSignedRequest(
      'putObject',
      command.input.Bucket,
      command.input.Key,
      60,
      url,
    );
  }

  async getPreSignedPutUniqueObjectUrl(bucket: string, keySuffix: string) {
    let alreadyExists = true;
    let uniqueKey = keySuffix;
    while (alreadyExists) {
      uniqueKey = `${uuidv4()}-${keySuffix}`;
      alreadyExists = await this.exists(bucket, uniqueKey);
    }
    const command = new PutObjectCommand({ Bucket: bucket, Key: uniqueKey });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 60 });
    return new S3PreSignedRequest(
      'putObject',
      command.input.Bucket,
      command.input.Key,
      60,
      url,
    );
  }
}
