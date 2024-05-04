import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './createUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../graphql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>
  ) {}
  async create(userDTO: CreateUserInputDto): Promise<UserSchema> {
    if (userDTO.password != userDTO.confirmPassword) {
      throw new BadRequestException('Not matched Passwords');
    }

    const salt = await bcrypt.genSalt();

    delete userDTO.confirmPassword;
    const saveUser = { ...userDTO };
    saveUser.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save({
      ...saveUser,
      role: UserRole.USER,
    });

    return user;
  }

  async findOne(data: Partial<UserSchema>): Promise<UserSchema> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
      select: { password: true, id: true, email: true, role: true },
    });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }
}
