import { Controller } from '@nestjs/common';
import { Speed } from './entity/speed.entity';
import { SpeedService } from './speed.service';

import { CreateSpeedDTO } from './dto/create_speed.dto';
import { UpdateSpeedDTO } from './dto/update_speed.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';

@Controller('speed')
export class SpeedController {
  constructor(private readonly speedService: SpeedService) {}

  @Get()
  getAllSpeeds(): Promise<Speed[]> {
    return this.speedService.findAll();
  }

  @Get(':id')
  getOneById(@Param('id') id: string): Promise<Speed> {
    return this.speedService.findOneBy(id);
  }

  @Post()
  async createSpeed(@Body() speed: CreateSpeedDTO) {
    try {
      const createdSpeed = await this.speedService.create(speed);
      return createdSpeed;
    } catch (error) {
      // Error Handler
      throw new HttpException(
        'Speed 생성 중에 문제가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  removeOneById(@Param('id') id: string): Promise<void> {
    return this.speedService.remove(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() speed: UpdateSpeedDTO) {
    return this.speedService.update(id, speed);
  }
}
