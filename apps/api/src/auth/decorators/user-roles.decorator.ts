import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../graphql";


export const UserRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);