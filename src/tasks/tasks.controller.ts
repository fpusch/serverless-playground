import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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

  @Get('list')
  listTask() {
    return this.tasksService.listTasks();
  }
}
