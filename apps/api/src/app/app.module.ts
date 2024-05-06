import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentSchema } from '../entities/comment.entity';
import { MessageSchema } from '../entities/message.entity';
import { MilestoneSchema } from '../entities/milestone.entity';
import { ProjectSchema } from '../entities/project.entity';
import { RoomSchema } from '../entities/room.entity';
import { UserSchema } from '../entities/user.entity';
import { TaskSchema } from '../entities/task.entity';
import { UserProjectSchema } from '../entities/userProject.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { configuration } from '../config';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { Project } from 'ts-morph';
import { ProjectModule } from '../project/project.module';
import { UserProjectModule } from '../user-project/user-project.module';
import { UserRoomSchema } from '../entities/userRoom.entity';
import { UserTaskSchema } from '../entities/userTask.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // validate,
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
          // url: 'postgresql://postgres:root@localhost:5432/teamflow',
          url: 'postgres://postgres.kpapyuzcwbyafarvyvku:teamflowsellaouti@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
          // url: configService.get<string>('database_url'),
          synchronize: true,
          // entities: [join(__dirname, '**/*.entity{.ts,.js}')],
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
    AuthModule,
    WorkspaceModule,
    UserWorkspaceModule,
    ProjectModule,
    UserProjectModule,
    TypeOrmModule.forFeature([
      UserSchema,
      UserWorkspaceSchema,
      WorkspaceSchema,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
