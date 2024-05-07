import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectSchema } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserProjectService {

  constructor(
    @InjectRepository(UserProjectSchema)
    private userProjectRepository: Repository<UserProjectSchema>
  ) { }

  async findUserProjectsByUserId(userId: string): Promise<UserProjectSchema[]> {
    const userProjects = await this.userProjectRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
    console.info('userProjects', userProjects);
    return userProjects;
  }


}
