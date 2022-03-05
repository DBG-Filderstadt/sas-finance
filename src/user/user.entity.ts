
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chipID: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  class: string;

  @Column()
  balance: number;

  @Column({nullable: true})
  role?: string;

  @Column({nullable: true})
  company?: string;

  @Column()
  isLocked: boolean;

  @Column()
  lastUsed: Date;
 
}