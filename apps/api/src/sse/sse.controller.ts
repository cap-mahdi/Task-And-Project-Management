import { Controller, UseGuards, Sse, Param } from "@nestjs/common";
import { GetUserGQL } from "../auth/decorators/gql-user.decorator";
import { GraphQLAuthGaurd } from "../auth/guards/gql-auth-guard";
import { UserSchema } from "../entities";
import { sseService } from "./sse.service";
import { GetUser } from "../auth/decorators/user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'))
<<<<<<< HEAD
//every path shoud end with /sse
=======
>>>>>>> d46d823721bbda71b973678bbad36a6f4eaa8701
export class sseController {
    constructor(private readonly sseService: sseService) { }
    @Sse('task/:taskId/sse')
    sse(@GetUser() user: UserSchema, @Param('taskId') taskId: string) {
        console.log('my User:', user);
        return this.sseService.sse(user, taskId);
    }

    @Sse('notif/sse')
    sseNotif(@GetUser() user: UserSchema) {
        console.log('my User:', user);
        return this.sseService.sseNotif(user);
    }
}