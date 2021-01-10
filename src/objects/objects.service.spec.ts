import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsService } from './objects.service';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { SqsService } from './sqs/sqs.service';

describe('ObjectsService', () => {
  let service: ObjectsService;
  let backendStorageService: S3StorageService;
  let backendQueueService: SqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ObjectsService, S3StorageService, SqsService],
    }).compile();

    service = module.get<ObjectsService>(ObjectsService);
    backendStorageService = module.get<S3StorageService>(S3StorageService);
    backendQueueService = module.get<SqsService>(SqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(backendStorageService).toBeDefined();
    expect(backendQueueService).toBeDefined();
  });
});
