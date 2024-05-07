import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectSchema } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectSchema)
    private readonly projectRepository: Repository<ProjectSchema>
  ) { }

  async findCreatedProjectsByUserId(userId: string): Promise<ProjectSchema[]> {
    const projects = await this.projectRepository.find({
      where: {
        creator: { id: userId },
      },
      relations: ['creator'],
    });

    console.info('projects', projects);
    return projects;
  }

}
