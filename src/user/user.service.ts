import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdateUserDTO } from './dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneBy(inpId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: inpId });
  }

  async create(user: CreateUserDTO) {
    await this.userRepository.save(user);
  }

  async update(inpId: string, user: UpdateUserDTO) {
    const prevUser = await this.userRepository.findOneBy({ id: inpId });

    if (!prevUser) {
      throw new NotFoundException(`User with ID ${inpId} not found`);
    }

    const updatedUser = { ...prevUser, ...user };
    await this.userRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(inpId: string): Promise<void> {
    const userToRemove = await this.userRepository.findOneBy({ id: inpId });

    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${inpId} not found`);
    }
    await this.userRepository.remove(userToRemove);
  }
}
