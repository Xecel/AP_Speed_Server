import { IsString, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @IsNumber()
  floorNumber: number;

  @IsNumber()
  roomNumber: number;

  @IsNumber()
  locationClass: number;

  @IsString()
  userCookie: string;
}
