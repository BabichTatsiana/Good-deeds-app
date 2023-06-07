import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name;

  @IsString()
  readonly email;

  @IsString()
  readonly deeds;

  @IsString()
  public password;
}
