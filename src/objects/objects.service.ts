import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateObjectDto } from './create-object.dto';
import { S3StorageService } from './s3-storage/s3-storage.service';

@Injectable()
export class ObjectsService {
  bucketName: string;
  messageQueueUrl: string;

  constructor(config: ConfigService, private storage: S3StorageService) {
    this.bucketName = config.get<string>('S3_OBJECTS_BUCKET_NAME');
    this.messageQueueUrl = config.get<string>('SQS_OBJECTS_QUEUE_URL');
  }

  list() {
    return this.storage.list(this.bucketName);
  }

  fetch(key: string) {
    return this.storage.getPreSignedGetObjectUrl(this.bucketName, key);
  }

  async replace(key: string) {
    return this.storage.getPreSignedPutObjectUrl(this.bucketName, key);
  }

  async create(dto: CreateObjectDto) {
    return this.storage.getPreSignedPutUniqueObjectUrl(
      this.bucketName,
      dto.keySuffix,
    );
  }
}
