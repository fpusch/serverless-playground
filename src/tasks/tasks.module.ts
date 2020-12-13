import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '../utils/utils.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [ConfigModule, UtilsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
