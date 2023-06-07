import { Body, Controller, Get, Header, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guars';
import { UserWithTokenDto } from 'src/user/dto/create-user-with-token';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/auth-user.dto';
import { UserWithoutTokenDto } from './dto/login-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<UserWithoutTokenDto> {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDto): Promise<UserWithTokenDto> {
    return this.authService.loginUser(dto);
  }
}
