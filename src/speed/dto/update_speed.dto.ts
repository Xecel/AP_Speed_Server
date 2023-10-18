import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeedDTO } from './create_speed.dto';
export class UpdateSpeedDTO extends PartialType(CreateSpeedDTO) {}
