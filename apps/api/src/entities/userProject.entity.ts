import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectRole, UserProject } from '../graphql';
import { UserSchema } from './user.entity';
import { ProjectSchema } from './project.entity';

@Entity({
  name: 'user_project',
})
@Index(['user', 'project'], { unique: true })
export class UserProjectSchema
  implements Omit<UserProject, 'user' | 'project'>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ProjectRole })
  role: ProjectRole;
  @CreateDateColumn({ type: 'timestamp' })
  addedAt: Date;

  @ManyToOne(() => UserSchema, (user) => user.userProjects)
  user: UserSchema;

  @ManyToOne(() => ProjectSchema, (project) => project.userProjects)
  project: ProjectSchema;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
