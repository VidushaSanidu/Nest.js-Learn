import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Logger } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/getTaskFilter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
    
        const query = this.createQueryBuilder('task');
        query.where({ user });
    
        if (status) {
          query.andWhere('task.status = :status', { status });
        }
    
        if (search) {
          query.andWhere(
            '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
            { search: `%${search}%` },
          );
        }
    
        try {
          const tasks = await query.getMany();
          return tasks;
        } catch (error) {
          this.logger.error(
            `Failed to get tasks for user "${
              user.username
            }". Filters: ${JSON.stringify(filterDto)}`,
            error.stack,
          );
          throw new InternalServerErrorException();
        }
      }
}
