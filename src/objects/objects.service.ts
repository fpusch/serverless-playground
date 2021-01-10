import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateObjectDto } from './create-object.dto';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { SqsService } from './sqs/sqs.service';

@Injectable()
export class ObjectsService {
  bucketName: string;
  messageQueueUrl: string;

  constructor(
    config: ConfigService,
    private storage: S3StorageService,
    private queue: SqsService,
  ) {
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
    const r = await this.queue.send(this.messageQueueUrl, {
      bucket: this.bucketName,
      key: key,
      time: Date.now(),
    });
    console.log(r);
    return this.storage.getPreSignedPutObjectUrl(this.bucketName, key);
  }

  async create(dto: CreateObjectDto) {
    const r = await this.queue.send(this.messageQueueUrl, {
      bucket: this.bucketName,
      key: dto.keySuffix,
      time: Date.now(),
    });
    console.log(r);
    return this.storage.getPreSignedPutUniqueObjectUrl(
      this.bucketName,
      dto.keySuffix,
    );
  }
}
