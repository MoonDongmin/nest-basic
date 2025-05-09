import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum RolesEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
