import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('sample')
  getTasks(): Task {
    const task: Task = {
      id: 1,
      name: 'A sample task',
      content: 'With sample content',
    };
    return task;
  }

  @Get()
  listTask() {
    return this.tasksService.listTasks();
  }

  @Get(':key')
  getTask(@Param('key') key: string) {
    return this.tasksService.fetchTask(key);
  }

  @Post()
  putTask(@Body() task: Task) {
    return this.tasksService.putTask(task);
  }
}
