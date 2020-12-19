import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateObjectDto } from './create-object.dto';
import { ObjectsService } from './objects.service';

@Controller('objects')
export class ObjectsController {
  constructor(private objectsService: ObjectsService) {}

  @Get()
  getObjectListing() {
    return this.objectsService.list();
  }

  @Get(':key')
  getObject(@Param('key') key: string) {
    return this.objectsService.fetch(key);
  }

  @Put(':key')
  replaceObject(@Param('key') key: string) {
    return this.objectsService.replace(key);
  }

  @Post()
  createObject(@Body() createObjectDto: CreateObjectDto) {
    return this.objectsService.create(createObjectDto);
  }
}
