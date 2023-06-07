import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  readonly email: string;

  @IsString()
  password: string;
}
