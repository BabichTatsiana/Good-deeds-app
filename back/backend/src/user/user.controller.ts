import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Patch, UseGuards } from '@nestjs/common/decorators';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-guars';
import { CreateDeedDto } from '../deed/dto/create-deed.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(public userService: UserService) {}

  @Get()
  getAll() {
    const users = this.userService.getAll();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    const user = this.userService.getOne(id);
    return user;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    const user = this.userService.create(dto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: ObjectId) {
    const user = this.userService.deleteOne(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(@Param('id') id: ObjectId, @Body() dto: CreateUserDto) {
    const user = this.userService.updateOne(id, dto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId/deeds')
  getDeeds(@Param('userId') userId: ObjectId) {
    return this.userService.getDeeds(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/deed')
  addDeed(@Body() dto: CreateDeedDto) {
    return this.userService.addDeed(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId/deed/:deedId')
  deleteDeed(
    @Param('userId') userId: ObjectId,
    @Param('deedId') deedId: ObjectId,
  ) {
    return this.userService.deleteDeed(userId, deedId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:userId/deed/:deedId')
  updateDeed(
    @Param('userId') userId: ObjectId,
    @Param('deedId') deedId: ObjectId,
    @Body() dto: CreateDeedDto,
  ) {
    return this.userService.updateDeed(userId, deedId, dto);
  }
}
