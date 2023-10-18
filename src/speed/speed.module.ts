import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpeedController } from './speed.controller';
import { SpeedService } from './speed.service';
import { Speed } from './entity/speed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speed])],
  controllers: [SpeedController],
  providers: [SpeedService],
})
export class SpeedModule {}
