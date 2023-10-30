import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MeasurementResultController } from './measurement_result.controller';
import { MeasurementResultService } from './measurement_result.service';
import { MeasurementResult } from './entity/measurement_result.entity';

import { User } from 'src/user/entity/user.entity';
import { Speed } from 'src/speed/entity/speed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementResult, User, Speed])],
  controllers: [MeasurementResultController],
  providers: [MeasurementResultService],
})
export class MeasurementResultModule {}
