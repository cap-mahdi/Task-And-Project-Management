import { Project } from "ts-morph";
import { ProjectNotification, User, Action, WorkspaceNotification, Workspace } from "../graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSchema } from "./user.entity";
import { ProjectSchema } from "./project.entity";
import { WorkspaceSchema } from "./workspace.entity";

@Entity({
    name: 'worskpace_notification'
})
export class WorkspaceNotificationSchema implements WorkspaceNotification {
    Workspace: Workspace;
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserSchema)
    actor: UserSchema;

    @ManyToOne(() => UserSchema)
    recipient: UserSchema;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => WorkspaceSchema)
    workspace: WorkspaceSchema;

    @Column({ type: 'enum', enum: Action })
    action: Action;

    @Column({
        default: false
    })
    read: boolean;
}