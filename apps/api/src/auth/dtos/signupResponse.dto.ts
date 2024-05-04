import { UserSchema } from '../../entities/user.entity';

export class SignupResponseDto {
  user: UserSchema;
  accessToken: string;
}
