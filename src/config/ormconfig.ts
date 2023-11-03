import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/user/entity/user.entity';
import { Speed } from 'src/speed/entity/speed.entity';
import { MeasurementResult } from 'src/measurement_result/entity/measurement_result.entity';

import * as dotenv from 'dotenv';
dotenv.config();

// 사용하는 entity 넣어준다.
const entities = [User, Speed, MeasurementResult];

export const ormConfig: TypeOrmModule = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: entities,
  synchronize: process.env.DB_SYNCHRONIZE,
};
