import { UserData } from '../entity/nested_user_data.entity';
import { SpeedData } from '../entity/nested_speed_data.entity';

export class CreateMeasurementResultDTO {
  user: UserData;
  speedTest: SpeedData;

  updated_at: Date;
}
