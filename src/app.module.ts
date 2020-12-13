import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
