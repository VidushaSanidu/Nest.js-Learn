import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  public getAlltasks() {
    return this.tasks;
  }
}
