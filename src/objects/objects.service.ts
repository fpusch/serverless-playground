import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateObjectDto } from './create-object.dto';
import { S3StorageService } from './s3-storage/s3-storage.service';

@Injectable()
export class ObjectsService {
  bucketName: string;

  constructor(config: ConfigService, private storage: S3StorageService) {
    this.bucketName = config.get<string>('S3_OBJECTS_BUCKET_NAME');
  }

  list() {
    return this.storage.list(this.bucketName);
  }

  fetch(key: string) {
    return this.storage.getPreSignedGetObjectUrl(this.bucketName, key);
  }

  replace(key: string) {
    return this.storage.getPreSignedPutObjectUrl(this.bucketName, key);
  }

  create(dto: CreateObjectDto) {
    return this.storage.getPreSignedPutUniqueObjectUrl(
      this.bucketName,
      dto.keySuffix,
    );
  }
}
