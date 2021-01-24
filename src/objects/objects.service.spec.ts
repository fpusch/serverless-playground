import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsService } from './objects.service';
import { DomainObjectsRepository } from './repositories/domain-objects.repository';
import { S3StorageService } from './s3-storage/s3-storage.service';

describe('ObjectsService', () => {
  let service: ObjectsService;
  let backendStorageService: S3StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ObjectsService, S3StorageService, DomainObjectsRepository],
    }).compile();

    service = module.get<ObjectsService>(ObjectsService);
    backendStorageService = module.get<S3StorageService>(S3StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(backendStorageService).toBeDefined();
  });
});
