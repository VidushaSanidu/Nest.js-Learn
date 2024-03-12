import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './dto/createTask.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public getAlltasks(): Task[] {
    return this.tasks;
  }

  async getTaskByID(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
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
