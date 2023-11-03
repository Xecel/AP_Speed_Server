import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { SpeedModule } from './speed/speed.module';
import { MeasurementResultModule } from './measurement_result/measurement_result.module';

import { ormConfig } from 'src/config/ormconfig';

@Module({
  imports: [
    UserModule,
    SpeedModule,
    MeasurementResultModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
