import { IsString } from 'class-validator';

export class UserWithoutTokenDto {
  @IsString()
  readonly name;

  @IsString()
  readonly email;

  @IsString()
  readonly deeds;
}
