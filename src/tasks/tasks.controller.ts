import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

  @Get()
  getTasks(): Task[] {
    const tasks: Task[] = [
      {
        id: 0,
        name: 'A task',
        content: 'some content.'
      }
    ];
    return tasks;
  }
}
