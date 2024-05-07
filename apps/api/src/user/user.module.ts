import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../entities/user.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { UserService } from './user.service';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { UserProjectModule } from '../user-project/user-project.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, UserWorkspaceSchema]),
    UserWorkspaceModule,
    UserProjectModule,
    WorkspaceModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule { }
