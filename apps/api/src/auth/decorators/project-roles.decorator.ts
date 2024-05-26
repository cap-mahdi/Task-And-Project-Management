import { SetMetadata } from '@nestjs/common';
import { ProjectRole } from '../../graphql';

export const ProjectRoles = (...roles: ProjectRole[]) =>
  SetMetadata('roles', roles);
