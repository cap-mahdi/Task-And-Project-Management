import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectRole, UserProject } from '../graphql';
import { UserSchema } from './user.entity';
import { ProjectSchema } from './project.entity';

@Entity({
  name: 'user_project',
})
export class UserProjectSchema
  implements Omit<UserProject, 'user' | 'project'>
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: ProjectRole })
  role: ProjectRole;

  @ManyToOne(() => UserSchema, (user) => user.projects)
  user: string;

  @ManyToOne(() => ProjectSchema, (project) => project.users)
  project: string;
}
