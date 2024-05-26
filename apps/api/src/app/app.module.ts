import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EnvVariables,
  authConfiguration,
  databaseConfiguration,
  validate,
} from '../config';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { ProjectModule } from '../project/project.module';
import { UserProjectModule } from '../user-project/user-project.module';
import {
  CommentSchema,
  WorkspaceSchema,
  UserProjectSchema,
  UserWorkspaceSchema,
  UserRoomSchema,
  UserTaskSchema,
  RoomSchema,
  UserSchema,
  TaskSchema,
  ProjectSchema,
  MilestoneSchema,
  MessageSchema,
} from '../entities';
import { EventsModule } from '../events/events.module';
import { RoomModule } from '../room/room.module';
import { UserRoomModule } from '../user-room/user-room.module';
import { MilestoneModule } from '../milestone/milestone.module';
import { TaskModule } from '../task/task.module';
import { UserTaskModule } from '../user-task/user-task.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfiguration, authConfiguration],
      validate: validate,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>(EnvVariables.DATABASE_URL),
          synchronize: true,
          entities: [
            CommentSchema,
            MessageSchema,
            MilestoneSchema,
            ProjectSchema,
            RoomSchema,
            TaskSchema,
            UserSchema,
            UserProjectSchema,
            UserRoomSchema,
            UserTaskSchema,
            UserWorkspaceSchema,
            WorkspaceSchema,
          ],
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    EventsModule,
    AuthModule,
    WorkspaceModule,
    UserWorkspaceModule,
    ProjectModule,
    UserProjectModule,
    MilestoneModule,
    RoomModule,
    UserRoomModule,
    TaskModule,
    UserTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
