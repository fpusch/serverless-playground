import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { S3StorageService } from './s3-storage/s3-storage.service';

@Module({
  controllers: [ObjectsController],
  imports: [ConfigModule],
  providers: [ObjectsService, S3StorageService],
})
export class ObjectsModule {}
