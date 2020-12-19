import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { S3PreSignedRequest } from './s3-pre-signed-request';

@Injectable()
export class S3StorageService {
  s3Client: S3;

  constructor(config: ConfigService) {
    this.s3Client = new S3({
      region: config.get<string>('AWS_REGION') || 'eu-central-1',
    });
  }

  list(bucket: string) {
    return this.s3Client.listObjectsV2({ Bucket: bucket }).promise();
  }

  async exists(bucket: string, key: string) {
    try {
      await this.s3Client.headObject({ Bucket: bucket, Key: key }).promise();
      return true;
    } catch (error) {
      return false;
    }
  }

  getPreSignedGetObjectUrl(bucket: string, key: string) {
    return this.getPreSignedUrl('getObject', bucket, key);
  }

  getPreSignedPutObjectUrl(bucket: string, key: string) {
    return this.getPreSignedUrl('putObject', bucket, key);
  }

  async getPreSignedPutUniqueObjectUrl(bucket: string, keySuffix: string) {
    let alreadyExists = true;
    let uniqueKey = keySuffix;
    while (alreadyExists) {
      uniqueKey = `${uuidv4()}-${keySuffix}`;
      alreadyExists = await this.exists(bucket, uniqueKey);
    }
    return this.getPreSignedUrl('putObject', bucket, uniqueKey);
  }

  private async getPreSignedUrl(
    operation: string,
    bucket: string,
    key: string,
    expires?: number,
  ) {
    const params = {
      Bucket: bucket,
      Key: key,
      Expires: expires || 60,
    };
    const url = await this.s3Client.getSignedUrlPromise(operation, params);
    return new S3PreSignedRequest(
      operation,
      params.Bucket,
      params.Key,
      params.Expires,
      url,
    );
  }
}
