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
import { UserRole } from '../graphql';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { CreateUserInputDto } from './createUser.dto';

@Resolver('User')
export class UserResolver {
  // constructor(
  //   @InjectRepository(UserSchema)
  //   private userRepository: Repository<UserSchema>,
  //   @InjectRepository(UserWorkspaceSchema)
  //   private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  // ) {}
  // @Query()
  // async users() {
  //   return this.userRepository.find();
  // }
  // @Mutation()
  // async createUser(
  //   @Args('createUserInput') createUserInput: CreateUserInputDto
  // ) {
  //   console.log(createUserInput);
  //   return this.userRepository.save({
  //     ...createUserInput,
  //     role: UserRole.USER,
  //   });
  // }
  // @ResolveField()
  // async workspaces(@Parent() user: UserSchema) {
  //   return this.userWorkspaceRepository.find({
  //     where: {
  //       user: user.id,
  //     },
  //   });
  // }
}
