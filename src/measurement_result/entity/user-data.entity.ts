import { Entity, Column } from 'typeorm';

@Entity()
export class UserData {
  @Column()
  floorNumber: number;

  @Column()
  roomNumber: number;

  @Column()
  locationClass: number;

  @Column()
  userCookie: string;
}
