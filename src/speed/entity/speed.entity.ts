import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Speed {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('decimal', { precision: 8, scale: 2 })
  dlStatus: number;

  @Column('decimal', { precision: 8, scale: 2 })
  ulStatus: number;

  @Column('decimal', { precision: 8, scale: 2 })
  pingStatus: number;

  @Column('decimal', { precision: 8, scale: 2 })
  jitterStatus: number;

  @Column()
  clientIp: string;
}
