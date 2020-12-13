import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('sample')
  getTasks(): Task {
    const task: Task = {
      id: 1,
      name: 'Another task',
      content: 'some more content.',
    };
    return task;
  }

  @Get()
  listTask() {
    return this.tasksService.listTasks();
  }

  @Get(':key')
  getTask(@Param('key') key: string, @Res() res: Response) {
    const s = this.tasksService.fetchTask(key);
    s.on('error', (err) => {
      res.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: err.message,
        error: err.name,
      });
    });
    s.pipe(res);
  }
}
