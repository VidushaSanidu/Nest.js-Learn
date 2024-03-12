import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAlltasks();
  }

  @Get('/:id')
  async getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete()
  deleteTaskbyID(@Param('id') id: string) {
    this.taskService.deleteTaskbyID(id);
  }
}
