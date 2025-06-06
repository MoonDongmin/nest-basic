import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';
import { TagModel } from './tag.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1:n 관계에서는 복수명사를 사용하는 것이 일반적
  // ManyToOne인 입장인사람이 id 값을 가짐
  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}
