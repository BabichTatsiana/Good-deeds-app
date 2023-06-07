import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeedModule } from './deed/deed.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:rootpass@localhost:27017/goods-db?authSource=admin',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    UserModule,
    AuthModule,
    DeedModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
