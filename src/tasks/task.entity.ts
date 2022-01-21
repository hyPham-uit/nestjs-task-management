/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne((type) => User, (user) => user.task, { eager: false })
  @Exclude({toPlainOnly:true})
  user: User;
}
