import { Project } from "ts-morph";
import { ProjectNotification, User, Action } from "../graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserSchema } from "./user.entity";
import { ProjectSchema } from "./project.entity";

@Entity({
    name: 'project_notification'
})
export class ProjectNotificationSchema implements ProjectNotification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserSchema)
    actor: UserSchema;

    @ManyToOne(() => UserSchema)
    recipient: UserSchema;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => ProjectSchema)
    project: ProjectSchema;

    @Column({ type: 'enum', enum: Action })
    action: Action;

    @Column({
        default: false
    })
    read: boolean;
}