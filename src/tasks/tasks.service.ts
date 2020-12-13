import { Injectable } from '@nestjs/common';
import S3 from 'aws-sdk/clients/s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  s3Client: S3;
  s3TasksBucketName: string;

  constructor(private config: ConfigService) {
    this.s3Client = new S3({});
    this.s3TasksBucketName = config.get<string>('S3_TASKS_BUCKET_NAME');
  }

  listTasks() {
    return this.s3Client
      .listObjectsV2({ Bucket: this.s3TasksBucketName })
      .promise();
  }

  fetchTask(key: string) {
    return this.s3Client
      .getObject({ Bucket: this.s3TasksBucketName, Key: key })
      .createReadStream();
  }
}
