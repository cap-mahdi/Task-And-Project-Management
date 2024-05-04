import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dtos/login.dto';
import { CreateUserInputDto } from '../user/createUser.dto';
import { SignupResponseDto } from './dtos/signupResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    console.info('from', user);
    if (passwordMatched) {
      delete user.password;
      const payload = { email: user.email, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Wrong Password');
    }
  }

  async signup(userDTO: CreateUserInputDto): Promise<SignupResponseDto> {
    const user = await this.userService.create(userDTO);
    console.info(user);
    console.info(userDTO);
    const { accessToken } = await this.login({
      email: userDTO.email,
      password: userDTO.password,
    });

    delete user.password;
    return {
      user,
      accessToken,
    };
  }
}
