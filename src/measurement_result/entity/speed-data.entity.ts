import { Entity, Column } from 'typeorm';

@Entity()
export class SpeedData {
  @Column('float')
  dlStatus: number;

  @Column('float')
  ulStatus: number;

  @Column('float')
  pingStatus: number;

  @Column('float')
  jitterStatus: number;

  @Column()
  clientIp: string;
}
