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
        content: 'some content.',
      },
      {
        id: 1,
        name: 'Another task',
        content: 'some more content.',
      },
    ];
    return tasks;
  }
}
