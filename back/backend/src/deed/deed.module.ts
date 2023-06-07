import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from 'src/deed/schemas/deed.schema';
import { DeedController } from './deed.controller';
import { DeedService } from './deed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [DeedController],
  providers: [DeedService],
})
export class DeedModule {}
