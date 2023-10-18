import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  floorNumber: number;

  @Column()
  roomNumber: number;

  @Column()
  locationClass: number;

  @Column()
  userCookie: string;
}
