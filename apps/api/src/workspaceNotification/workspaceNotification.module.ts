import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectNotificationSchema } from "../entities/ProjectNotification.entity";
import { WorkspaceModule } from "../workspace/workspace.module";
import { UserWorkspaceModule } from "../user-workspace/user-workspace.module";
import { WorkspaceNotificationResolver } from "./workspaceNotification.resolver";
import { WorkspaceNotificationService } from "./workspaceNotification.service";
import { EventEmitter } from "stream";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { WorkspaceNotificationSchema } from "../entities/WorkspaceNotification.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkspaceNotificationSchema]),
        WorkspaceModule,
        UserWorkspaceModule,
        EventEmitterModule.forRoot()
    ],
    providers: [WorkspaceNotificationResolver, WorkspaceNotificationService],
    exports: [WorkspaceNotificationService],
})
export class WorkspaceNotifcationModule { }
