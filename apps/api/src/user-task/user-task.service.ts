import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTaskSchema } from '../entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTaskSchema)
    private userTaskRepository: Repository<UserTaskSchema>
  ) {}

  async find(options: FindManyOptions<UserTaskSchema>) {
    return this.userTaskRepository.find(options);
  }
  async findOne(options: FindOneOptions<UserTaskSchema>) {
    return this.userTaskRepository.findOne(options);
  }
}
