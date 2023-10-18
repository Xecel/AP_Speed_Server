import { Controller } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

import { CreateUserDTO } from './dto/create_user.dto';
import { UpdateUserDTO } from './dto/update_user.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneBy(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    try {
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (error) {
      // Error Handler
      throw new HttpException(
        '유저 생성 중에 문제가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return this.userService.update(id, user);
  }
}
