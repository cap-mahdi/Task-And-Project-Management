import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectRole, UserProject } from '../graphql';
import { UserSchema } from './user.entity';
import { ProjectSchema } from './project.entity';
import { Project } from 'ts-morph';

@Entity({
  name: 'user_project',
})
export class UserProjectSchema
  implements Omit<UserProject, 'user' | 'project'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProjectRole })
  role: ProjectRole;

  @ManyToOne(() => UserSchema, (user) => user.userProjects)
  user: UserSchema;

  @ManyToOne(() => ProjectSchema, (project) => project.userProjects)
  project: ProjectSchema;
}
