import { UserData } from '../entity/user-data.entity';
import { SpeedData } from '../entity/speed-data.entity';

export class CreateMeasurementResultDTO {
  user: UserData;
  speedTest: SpeedData;

  updated_at: Date;
}
