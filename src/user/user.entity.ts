
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

  @Column()
  role?: string;

  @Column()
  company?: string;

  @Column()
  isLocked: boolean;

  @Column()
  lastUsed: Date;
 
}