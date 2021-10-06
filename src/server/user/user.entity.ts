import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantUser } from '../../constants/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: ConstantUser.MAXEMAIL })
  email: string;

  @Column()
  password: string;

  @Column({ length: ConstantUser.MAXNAME })
  name: string;

  @Column({ default: 0 })
  highScore: number;
}
