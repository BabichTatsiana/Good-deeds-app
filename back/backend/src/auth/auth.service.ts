import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/errors';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from './dto/auth-user.dto';
import { UserWithoutTokenDto } from './dto/login-user.dto';
import { TokenService } from 'src/token/token.service';
import * as bcrypt from 'bcrypt';
import { UserWithTokenDto } from 'src/user/dto/create-user-with-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<UserWithoutTokenDto> {
    const existsUser = await this.userService.findUserByEmail(dto.email);
    if (existsUser) {
      throw new BadRequestException(AppError.USER_EXISTS);
    }
    await this.userService.create(dto);

    const publicUser = await this.userService.publicUser(dto.email);
    return { ...publicUser };
  }

  async loginUser(dto: UserLoginDto): Promise<UserWithTokenDto> {
    const existsUser = await this.userService.findUserByEmail(dto.email);
    if (!existsUser) throw new BadRequestException(AppError.USER_NOT_EXISTS);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existsUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const token = await this.tokenService.generateJwtToken({
      id: existsUser._id,
      email: existsUser.email,
    });
    const publicUser = await this.userService.publicUser(dto.email);
    return { ...publicUser, token };
  }

  async getUser(dto: string): Promise<UserWithoutTokenDto> {
    const user = await this.tokenService.verifyToken(dto);
    const publicUser = await this.userService.publicUser(user.email);
    return publicUser;
  }
}
