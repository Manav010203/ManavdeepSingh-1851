// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   ManyToOne,
// } from 'typeorm';
// import { User } from '../users/user.entity';
// import { BrandStatus } from './brand-status.enum';

// @Entity()
// export class Brand {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   name: string;

//   @Column({ nullable: true })
//   description?: string;

//   @Column({ nullable: true })
//   logoUrl?: string;

//   @Column({
//     type: 'enum',
//     enum: BrandStatus,
//     default: BrandStatus.DISAPPROVED,
//   })
//   status: BrandStatus;

//   @ManyToOne(() => User, { nullable: false })
//   createdBy: User;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { BrandStatus } from './brand-status.enum';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({
    type: 'enum',
    enum: BrandStatus,
    default: BrandStatus.DISAPPROVED,
  })
  status: BrandStatus;

  // 👇 Inverse relation (FIX)
  @OneToMany(() => User, (user) => user.brand)
  users: User[];

  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
