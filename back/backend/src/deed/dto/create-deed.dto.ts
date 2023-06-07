import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDeedDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly text: string;

  readonly userId: ObjectId;
}
