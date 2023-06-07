import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type DeedDocument = HydratedDocument<Deed>;

@Schema()
export class Deed {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
