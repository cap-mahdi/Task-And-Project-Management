import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInputDto } from './createUser.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordInput, GetUserInput, UpdateUserInput, UserRole } from '../graphql';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>,
    private readonly cloudinaryService: CloudinaryService
  ) { }
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

  async findAll(): Promise<UserSchema[]> {
    return await this.userRepository.find();
  }

  async findAllByParams(params: GetUserInput): Promise<UserSchema[]> {
    return await this.userRepository.find({
      where: {
        ...params,
      },
    });
  }

  async getUserById(userId: string): Promise<UserSchema> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    delete foundUser.password;
    console.log(foundUser);

    return foundUser;
  }

  async getUserByEmail(email: string): Promise<UserSchema> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async getUserByUserWorkspaceId(userWorkspaceId: string): Promise<UserSchema> {
    const foundUser = await this.userRepository.findOne({
      where: {
        userWorkspaces: { id: userWorkspaceId },
      }, relations: ['userWorkspaces'],
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async updateUser(userId: string, user: UpdateUserInput): Promise<UserSchema> {
    const userToUpdate = await this.userRepository.findOne({ where: { id: userId } })
    if (!userToUpdate) {
      throw new BadRequestException('User not found')
    }
    const updatedUser = await this.userRepository.save({ ...userToUpdate, ...user })
    return updatedUser
  }

  async deleteUser(userId: string): Promise<UserSchema> {
    const deletedUser = await this.userRepository.softDelete(userId);
    if (!deletedUser.affected) {
      throw new NotFoundException('User not found')
    }
    return deletedUser.raw[0]
  }

  async changePassword(userId: string, changePasswordInput: ChangePasswordInput): Promise<UserSchema> {
    const userToUpdate = await this.userRepository.findOne({ where: { id: userId } })
    if (!userToUpdate) {
      throw new BadRequestException('User not found')
    }
    if (changePasswordInput.newPassword !== changePasswordInput.confirmPassword) {
      throw new BadRequestException('Passwords do not match')
    }
    const isMatch = await bcrypt.compare(changePasswordInput.oldPassword, userToUpdate.password)
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect')
    }
    const salt = await bcrypt.genSalt();
    const updatedUser = await this.userRepository.save({ ...userToUpdate, password: await bcrypt.hash(changePasswordInput.newPassword, salt) })
    return updatedUser
  }


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  async changeUserAvatar(userId: string, file: Express.Multer.File): Promise<UserSchema> {
    const userToUpdate = await this.userRepository.findOne({ where: { id: userId } })
    if (!userToUpdate) {
      throw new BadRequestException('User not found')
    }
    const cloudinaryResponse = await this.cloudinaryService.uploadFile(file)
    const updatedUser = await this.userRepository.save({ ...userToUpdate, avatar: cloudinaryResponse.secure_url })
    delete updatedUser.password
    return updatedUser
  }

}
