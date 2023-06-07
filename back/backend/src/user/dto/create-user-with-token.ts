import { IsString } from 'class-validator';

export class UserWithTokenDto {
  @IsString()
  readonly name;

  @IsString()
  readonly email;

  @IsString()
  readonly deeds;

  @IsString()
  public token;
}
