import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceSchema } from '../entities/workspace.entity';
import { UserSchema } from '../entities/user.entity';
import { UserWorkspaceSchema } from '../entities/userWorkspace.entity';
import { WorkspaceRole } from '../graphql';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,

    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>,

    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>,

    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  ) {}

  @Get()
  async getData() {
    const workspace = await this.workspaceRepository.findOne({
      where: { name: 'workspace' },
    });
    const user = await this.userRepository.findOne({
      where: { email: 'mahdi@gmail.com' },
    });
    const e = await this.userWorkspaceRepository.save({
      user,
      workspace,
      role: WorkspaceRole.WORKSPACE_EDITOR,
    });
    await this.userWorkspaceRepository.softDelete(e.id);
    await this.userWorkspaceRepository.save({
      user,
      workspace,
      role: WorkspaceRole.WORKSPACE_EDITOR,
    });
  }

  @Get('error')
  async shoudGiveMeError() {
    const workspace = await this.workspaceRepository.findOne({
      where: { name: 'workspace' },
    });
    const user = await this.userRepository.findOne({
      where: { email: 'mahdi@gmail.com' },
    });
    await this.userWorkspaceRepository.save({
      user,
      workspace,
      role: WorkspaceRole.WORKSPACE_EDITOR,
    });
    // await this.userWorkspaceRepository.softDelete(e.id);
    await this.userWorkspaceRepository.save({
      user,
      workspace,
      role: WorkspaceRole.WORKSPACE_MEMBER,
    });
  }

  @Get('find')
  async find() {
    const workspace = await this.workspaceRepository.findOne({
      where: { name: 'workspace' },
    });
    const user = await this.userRepository.findOne({
      where: { email: 'mahdi@gmail.com' },
    });
    console.log(workspace, user);
    const r = await this.userWorkspaceRepository.find({
      // where: { user },
      withDeleted: true,
    });
    return r;
  }
}
