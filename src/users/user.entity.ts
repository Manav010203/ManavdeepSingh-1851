// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// export enum UserRole {
//   ADMIN = 'ADMIN',
//   BRAND = 'BRAND',
// }

// @Entity({ name: 'users' })
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column({
//     type: 'enum',
//     enum: UserRole,
//     default: UserRole.BRAND,
//   })
//   role: UserRole;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at' })
//   updatedAt: Date;
// }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ManyToOne(() => Brand, (brand) => brand.users, {
  nullable: true,
})
brand: Brand;


  @OneToMany(() => Brand, (brand) => brand.createdBy)
  createdBrands: Brand[];
}
