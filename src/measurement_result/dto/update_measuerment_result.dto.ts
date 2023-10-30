import { PartialType } from '@nestjs/mapped-types';
import { CreateMeasurementResultDTO } from './create_measuerment_result.dto';
export class UpdateMeasurementResultDTO extends PartialType(
  CreateMeasurementResultDTO,
) {}
