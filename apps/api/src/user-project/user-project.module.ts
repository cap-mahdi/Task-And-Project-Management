import { Module } from '@nestjs/common';
import { UserProjectResolver } from './user-project.resolver';

@Module({
  providers: [UserProjectResolver]
})
export class UserProjectModule {}
