import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectNotificationSchema } from "../entities/ProjectNotification.entity";
import { UserProjectModule } from "../user-project/user-project.module";
import { ProjectModule } from "../project/project.module";
import { ProjectNotificationResolver } from "./ProjectNotification.resolver";
import { ProjectNotificationService } from "./ProjectNotification.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectNotificationSchema]),
        ProjectModule,
        UserProjectModule
    ],
    providers: [ProjectNotificationResolver, ProjectNotificationService],
    exports: [ProjectNotificationService],
})
export class ProjectNotifcationModule { }
