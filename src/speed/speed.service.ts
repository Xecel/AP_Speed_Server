import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Speed } from './entity/speed.entity';
import { CreateSpeedDTO } from './dto/create_speed.dto';
import { UpdateSpeedDTO } from './dto/update_speed.dto';

@Injectable()
export class SpeedService {
  constructor(
    @InjectRepository(Speed)
    private speedRepository: Repository<Speed>,
  ) {}

  findAll(): Promise<Speed[]> {
    return this.speedRepository.find();
  }

  findOneBy(inpId: string): Promise<Speed> {
    return this.speedRepository.findOneBy({ id: inpId });
  }

  async create(speed: CreateSpeedDTO) {
    await this.speedRepository.save(speed);
  }

  async update(inpId: string, speed: UpdateSpeedDTO) {
    const prevSpeed = await this.speedRepository.findOneBy({ id: inpId });

    if (!prevSpeed) {
      throw new NotFoundException(`Speed with ID ${inpId} not found`);
    }

    const updatedSpeed = { ...prevSpeed, ...speed };
    await this.speedRepository.save(updatedSpeed);

    return updatedSpeed;
  }

  async remove(inpId: string): Promise<void> {
    const speedToRemove = await this.speedRepository.findOneBy({ id: inpId });

    if (!speedToRemove) {
      throw new NotFoundException(`Speed with ID ${inpId} not found`);
    }
    await this.speedRepository.remove(speedToRemove);
  }
}
