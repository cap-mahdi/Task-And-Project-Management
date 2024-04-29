import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInputDto } from '../user/createUser.dto';
import { UserSchema } from '../entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  @ApiBody({ type: CreateUserInputDto })
  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserInputDto
  ): Promise<UserSchema> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  login(
    @Body()
    loginDTO: LoginDTO
  ) {
    return this.authService.login(loginDTO);
  }
}
