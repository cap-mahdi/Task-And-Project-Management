import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../entities/user.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, UserWorkspaceSchema])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
