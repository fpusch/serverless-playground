import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';

@Module({
  imports: [ConfigModule],
  exports: [StorageService],
  providers: [StorageService],
})
export class UtilsModule {}
