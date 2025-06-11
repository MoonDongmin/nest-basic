import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entity/base.entity';
import { UsersModel } from './users.entity';

@Entity()
export class UserFollowersModel extends BaseModel {
  @ManyToOne(() => UsersModel, (user) => user.followers)
  // UserFollowersModel 관점에서 볼 때
  follower: UsersModel;
  @ManyToOne(() => UsersModel, (user) => user.followees)
  followee: UsersModel;

  @Column({
    default: false,
  })
  isConfirmed: boolean;
}
