import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAlltasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task with ID "${id}" not Found');
    }
    return task;
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskbyID(id: string) {
    const task: Task = this.getTaskByID(id);
    const index: number = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}
