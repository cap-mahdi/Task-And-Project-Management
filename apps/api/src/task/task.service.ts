import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MilestoneSchema,
  TaskSchema,
  UserProjectSchema,
  UserSchema,
  UserTaskSchema,
} from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateTask, Status, Task, UpdateTask } from '../graphql';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(MilestoneSchema)
    private milestoneRepository: Repository<MilestoneSchema>,
    @InjectRepository(TaskSchema)
    private taskRepository: Repository<TaskSchema>,
    @InjectRepository(UserTaskSchema)
    private userTaskRepository: Repository<UserTaskSchema>,
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>
  ) {}

  async find(options?: FindManyOptions<TaskSchema>) {
    return this.taskRepository.find(options);
  }
  async findOne(options?: FindOneOptions<TaskSchema>) {
    return this.taskRepository.findOne(options);
  }

  async createTask(
    task: CreateTask,
    creator: UserSchema,
    milestoneId: string
  ): Promise<Task> {
    console.log('milestoneId', milestoneId);
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId },
      relations: ['project'],
    });
    if (!milestone) throw new NotFoundException('Milestone not found');
    console.log('milestone', milestone);

    const creatorProject = await this.userProjectRepository.findOne({
      where: {
        user: { id: creator.id },
        project: { id: milestone.project.id },
      },
    });
    if (!creatorProject) {
      throw new BadRequestException('Creator not member of project');
    }
    const userProjects = await this.userProjectRepository.find({
      where: {
        user: task.assignees.map((a) => ({
          id: a,
        })),
        project: { id: milestone.project.id },
      },
      relations: ['user'],
    });
    console.log('userProjects', userProjects);
    if (userProjects.length !== task.assignees.length) {
      throw new BadRequestException('Assignee not found in project');
    }

    const newTask = this.taskRepository.create({
      ...task,
      status: Status.OPEN,
      creator,
      milestone,
    });

    console.log('newTask', newTask);
    const savedTask = await this.taskRepository.save(newTask);
    console.log('savedTask', savedTask);
    const e = this.userTaskRepository.save(
      task.assignees.map((assignee) => ({
        user: { id: assignee },
        task: savedTask,
      }))
    );
    console.log('e', e);

    return newTask;
  }

  async updateTask(
    taskId: string,
    task: UpdateTask,
    user: UserSchema
  ): Promise<Task> {
    const oldTask = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['milestone'],
    });

    if (!oldTask) {
      throw new NotFoundException('Task not found');
    }

    if (task.assignees && task.assignees.length > 0) {
      const milestone = oldTask.milestone;
      const { project } = await this.milestoneRepository.findOne({
        where: { id: milestone.id },
        relations: ['project'],
      });

      const userProjects = await this.userProjectRepository.find({
        where: {
          user: task.assignees.map((a) => ({ id: a })),
          project: { id: project.id },
        },
        relations: ['project'],
      });
      console.log('userProjects', userProjects);
      if (userProjects.length !== task.assignees.length) {
        throw new BadRequestException('Assignee not found in project');
      }
    }

    await this.taskRepository.save({
      id: taskId,
      ...task,
    });
    if (task.assignees) {
      await this.userTaskRepository.delete({ task: { id: taskId } });
      await this.userTaskRepository.save(
        task.assignees.map((assignee) => ({
          user: { id: assignee },
          task: { id: taskId },
        }))
      );
    }

    return this.taskRepository.findOne({ where: { id: taskId } });
  }

  async deleteTask(taskId: string, user: UserSchema) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['milestone'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const project = await this.milestoneRepository.findOne({
      where: { id: task.milestone.id },
      relations: ['project'],
    });

    const userProject = await this.userProjectRepository.findOne({
      where: {
        user: { id: user.id },
        project: { id: project.project.id },
      },
    });

    if (!userProject) {
      throw new BadRequestException('User not member of project');
    }

    await this.taskRepository.softDelete({ id: taskId });
    console.log('task deleted', task);
    return true;
  }
}
