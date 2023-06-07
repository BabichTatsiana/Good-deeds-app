import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from 'src/deed/schemas/deed.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
