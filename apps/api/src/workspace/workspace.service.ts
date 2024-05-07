import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkspaceSchema } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceSchema)
    private workspaceRepository: Repository<WorkspaceSchema>
  ) { }

  async findCreatedWorkspacesByUserId(userId: string): Promise<WorkspaceSchema[]> {
    const workspaces = await this.workspaceRepository.find({
      where: {
        creator: { id: userId },
      },
      relations: ['creator'],
    });

    console.info('workspaces', workspaces);
    return workspaces;
  }


}
