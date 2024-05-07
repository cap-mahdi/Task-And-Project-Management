import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserWorkspaceSchema } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class UserWorkspaceService {
  constructor(
    @InjectRepository(UserWorkspaceSchema)
    private userWorkspaceRepository: Repository<UserWorkspaceSchema>
  ) { }

  async findUserWorkspacesByUserId(userId: string): Promise<UserWorkspaceSchema[]> {
    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
    console.info('userWorkspaces', userWorkspaces);
    return userWorkspaces;
  }

}
