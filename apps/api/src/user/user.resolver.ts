import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserSchema } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { GetUserInput } from '../graphql';

@Resolver('User')
export class UserResolver {
  constructor(
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>,
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  ) {}

  @Query()
  async users() {
    const users = await this.userRepository.find();
    console.info('users', users);
    return users;
  }

  @Query()
  async getUsersByParams(
    @Args('input') input: GetUserInput
  ): Promise<UserSchema[]> {
    return await this.userRepository.find({
      where: {
        ...input,
      },
    });
  }

  @ResolveField('userWorkspaces')
  async workspaces(@Parent() user: UserSchema): Promise<UserWorkspaceSchema[]> {
    console.info('user', user);
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['user'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }
}
