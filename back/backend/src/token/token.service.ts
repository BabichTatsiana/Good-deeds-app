import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { JwtService } from '@nestjs/jwt';
import { SECRET_JWT_TOKEN } from 'src/common/constant';
import { UserWithTokenDto } from 'src/user/dto/create-user-with-token';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user) {
    return (
      this,
      this.jwtService.sign(user, {
        secret: SECRET_JWT_TOKEN,
        expiresIn: 860000,
      })
    );
  }

  async verifyToken(token: string): Promise<UserWithTokenDto> {
    const user = this.jwtService.verify<UserWithTokenDto>(token);
    return user;
  }
}
