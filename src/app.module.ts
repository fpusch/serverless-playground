import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './objects/objects.module';

@Module({
  imports: [ConfigModule.forRoot(), ObjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
