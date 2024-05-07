import { SetMetadata } from "@nestjs/common";
import { WorkspaceRole } from "../../graphql";


export const WorkspaceRoles = (...roles: WorkspaceRole[]) => SetMetadata('roles', roles);




