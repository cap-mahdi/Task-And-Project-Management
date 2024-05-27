import { Controller, UseGuards, Sse, Param } from "@nestjs/common";
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { GraphQLAuthGaurd } from "../auth/guards/gql-auth-guard";
import { UserSchema } from "../entities";
import { sseService } from "./sse.service";
import { GetUser } from "../auth/decorators/user.decorator";

@Controller('task')
export class sseController {
    constructor(private readonly sseService: sseService) { }
    @Sse(':taskId/sse')
    sse(@GetUser() user: UserSchema, @Param('taskId') taskId: string) {
        return this.sseService.sse(user, taskId);
    }
}