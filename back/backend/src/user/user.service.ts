import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Deed, DeedDocument } from 'src/deed/schemas/deed.schema';
import { CreateDeedDto } from '../deed/dto/create-deed.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Deed.name) private deedModel: Model<DeedDocument>,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    const existsUser = await this.userModel.findOne({ email });
    return existsUser;
  }

  async publicUser(email: string) {
    return this.userModel
      .findOne({ email })
      .select(['email', '_id', 'name', 'deeds']);
  }

  async create(dto: CreateUserDto): Promise<User> {
    dto.password = await this.hashPassword(dto.password);
    return await this.userModel.create({ ...dto });
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getOne(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id).populate('deeds');
    return user;
  }

  async deleteOne(id: ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async updateOne(id: ObjectId, dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    return user;
  }

  async addDeed(dto: CreateDeedDto): Promise<Deed> {
    const user = await this.userModel.findById(dto.userId);
    const deed = await this.deedModel.create({ ...dto });
    user.deeds.push(deed.id);
    await user.save();
    return deed;
  }

  async getDeeds(userId: ObjectId): Promise<Deed[]> {
    const deeds = await this.deedModel.find({ userId: userId });
    return deeds;
  }

  async deleteDeed(userId: ObjectId, deedId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    const deed = await this.deedModel.findByIdAndDelete(deedId);
    this.replaceDeedById(user.deeds, deed.id);
    await user.save();
  }

  async updateDeed(
    userId: ObjectId,
    deedId: ObjectId,
    dto: CreateDeedDto,
  ): Promise<Deed> {
    const user = await this.userModel.findById(userId);
    const deed = await this.deedModel.findByIdAndUpdate(deedId, dto, {
      new: true,
    });
    this.replaceDeedById(user.deeds, deed.id, deed);
    await user.save();
    return deed;
  }

  replaceDeedById(deeds, id, replacement = null) {
    const index = deeds.findIndex((deed) => deed.id === id);
    if (index !== -1) {
      deeds.splice(index, 1, replacement);
    }
    return deeds;
  }
}
