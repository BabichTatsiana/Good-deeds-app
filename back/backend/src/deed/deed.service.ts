import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deed, DeedDocument } from 'src/deed/schemas/deed.schema';

@Injectable()
export class DeedService {
  constructor(@InjectModel(Deed.name) private deedModel: Model<DeedDocument>) {}

  async getAll(): Promise<Deed[]> {
    const deeds = await this.deedModel.find();
    return deeds;
  }
}
