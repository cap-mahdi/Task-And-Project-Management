import { Controller, UseGuards, Sse, Param } from "@nestjs/common";
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { GraphQLAuthGaurd } from "../auth/guards/gql-auth-guard";
import { UserSchema } from "../entities";
import { sseService } from "./sse.service";

@Controller('sse/:taskId')
@UseGuards(GraphQLAuthGaurd)
export class sseController {
    constructor(private readonly sseService: sseService) { }
    @Sse()
    sse(@GetUserGQL() user: UserSchema, @Param('taskId') taskId: string) {
        return this.sseService.sse(user, taskId);
    }
}