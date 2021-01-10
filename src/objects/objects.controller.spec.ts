import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { S3StorageService } from './s3-storage/s3-storage.service';
import { SqsService } from './sqs/sqs.service';

describe('ObjectsController', () => {
  let controller: ObjectsController;
  let service: ObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectsController],
      imports: [ConfigModule],
      providers: [ObjectsService, S3StorageService, SqsService],
    }).compile();

    controller = module.get<ObjectsController>(ObjectsController);
    service = module.get<ObjectsService>(ObjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
