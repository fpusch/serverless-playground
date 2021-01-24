import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateObjectDto } from './models/create-object.dto';
import { DomainObjectsRepository as DomainObjectsRepository } from './repositories/domain-objects.repository';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { StoredObjectDto } from './models/stored-object.dto';
import { CreateDomainObjectDto } from './models/create-domain-object.dto';

@Injectable()
export class ObjectsService {
  bucketName: string;
  messageQueueUrl: string;

  constructor(
    config: ConfigService,
    private storage: S3StorageService,
    private objectsRepo: DomainObjectsRepository,
  ) {
    this.bucketName = config.get<string>('S3_OBJECTS_BUCKET_NAME');
    this.messageQueueUrl = config.get<string>('SQS_OBJECTS_QUEUE_URL');
  }

  async list(): Promise<StoredObjectDto[]> {
    const r = await this.storage.list(this.bucketName);
    const objects = r.Contents.map((v) => {
      const storedObject: StoredObjectDto = {
        id: v.Key,
        size: v.Size,
        lastModified: v.LastModified,
      };
      return storedObject;
    });
    return objects;
  }

  async fetch(key: string) {
    const r = await this.storage.getPreSignedGetObjectUrl(this.bucketName, key);
    const object: StoredObjectDto = {
      id: r.key,
      url: r.url,
    };
    return object;
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

  async createDomainObject(dto: CreateDomainObjectDto) {
    return this.objectsRepo.createObject(dto);
  }
}
