import { IsString, IsNumber } from 'class-validator';

export class CreateSpeedDTO {
  @IsNumber()
  dlStatus: number;

  @IsNumber()
  ulStatus: number;

  @IsNumber()
  pingStatus: number;

  @IsString()
  clientIp: string;

  @IsNumber()
  jitterStatus: number;
}
