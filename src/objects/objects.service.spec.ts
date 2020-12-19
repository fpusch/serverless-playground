import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsService } from './objects.service';
import { S3StorageService } from './s3-storage/s3-storage.service';

describe('ObjectsService', () => {
  let service: ObjectsService;
  let backendService: S3StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ObjectsService, S3StorageService],
    }).compile();

    service = module.get<ObjectsService>(ObjectsService);
    backendService = module.get<S3StorageService>(S3StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(backendService).toBeDefined();
  });
});
