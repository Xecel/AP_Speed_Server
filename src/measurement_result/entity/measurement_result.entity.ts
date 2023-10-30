// src/entity/MeasurementResult.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

// import { SpeedData } from './speed-data.entity';
// import { UserData } from './user-data.entity';

import { User } from 'src/user/entity/user.entity';
import { Speed } from 'src/speed/entity/speed.entity';

import { UserData } from './user-data.entity';
import { SpeedData } from './speed-data.entity';

@Entity()
export class MeasurementResult {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn()
  IUser: User;

  @OneToOne(() => Speed, {
    cascade: true,
  })
  @JoinColumn()
  ISpeed: Speed;

  @Column(() => UserData)
  user: UserData;

  @Column(() => SpeedData)
  speedTest: SpeedData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
