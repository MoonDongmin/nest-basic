import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;

  // 1:1 관게 설정
  // 첫 번째 매개변수는 어떤 엔티티와 관계를 맺을 것인가
  // 두 번째 매개변수는 그 엔티티 테이블에 어떤 속성으로 맺을 것인가
  @OneToOne(() => UserModel, (user) => user.id)
  // JoinColumn()을 해줘야하는데 이 데코레이터가 있는 곳에서 관련 id가 생김
  // ex. 지금은 ProfileModel에 했는데 이러면 UserModel의 참조 아이디가 이 테이블에 생성된다는 뜻
  @JoinColumn()
  user: UserModel;

  @Column()
  profileImg: string;
}
