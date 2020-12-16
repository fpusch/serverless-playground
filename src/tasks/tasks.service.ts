import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../utils/storage.service';
import { TaskSavedDto } from './task-saved.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  tasksBucketName: string;

  constructor(private config: ConfigService, private storage: StorageService) {
    this.tasksBucketName = config.get<string>('S3_TASKS_BUCKET_NAME');
  }

  listTasks() {
    return this.storage.list(this.tasksBucketName);
  }

  fetchTask(key: string) {
    return this.storage.fetchPreSignedUrl(this.tasksBucketName, key);
  }

  async putTask(task: Task): Promise<TaskSavedDto> {
    const key = `${uuidv4()}.json`;
    await this.storage.put(this.tasksBucketName, key, JSON.stringify(task));
    return {
      key: key,
      status: 'PERSISTED',
      message: 'persisted to storage successfully',
    };
  }
}
