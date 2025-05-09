import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from '../../users/entities/users.entity';

@Entity()
export class PostsModel {
  // 이걸 쓰면 PG에서 알아서 자동으로 id 값을 배정을 해줌
  @PrimaryGeneratedColumn()
  id: number;

  // 1) UsersModel과 연동함. Foreign Key를 이용해서
  // 2) null이 될 수 없음
  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
