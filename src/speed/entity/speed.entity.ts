import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speed {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dlStatus: number;

  @Column()
  ulStatus: number;

  @Column()
  pingStatus: number;

  @Column()
  clientIp: string;

  @Column()
  jitterStatus: number;
}
