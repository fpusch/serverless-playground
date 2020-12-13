import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';

const S3_TASKS_BUCKET_NAME = process.env.S3_TASKS_BUCKET_NAME;

@Injectable()
export class TasksService {
  s3Client: S3;
  constructor() {
    this.s3Client = new S3({});
  }

  listTasks() {
    return this.s3Client.listObjectsV2({ Bucket: S3_TASKS_BUCKET_NAME });
  }
}
