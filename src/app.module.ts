import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

import { Speed } from './speed/entity/speed.entity';
import { SpeedModule } from './speed/speed.module';
import { MeasurementResult } from './measurement_result/entity/measurement_result.entity';
import { MeasurementResultModule } from './measurement_result/measurement_result.module';

@Module({
  imports: [
    UserModule,
    SpeedModule,
    MeasurementResultModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      entities: [User, Speed, MeasurementResult],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
