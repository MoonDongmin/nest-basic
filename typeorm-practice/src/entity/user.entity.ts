import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Version } from '@nestjs/common';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // 자동으로 아이디를 생성함
  //@PrimaryGeneratedColumn()

  // 모든 테이블에서 기본적으로 존재해야함
  // 테이블 안에서 각각의 ROW를 구분 할 수 있는 칼럼
  // 자동생성이 아니라서 개발자가 직접 값을 넣어야 함
  //@PrimaryColumn()

  //@PrimaryGeneratedColumn() -> 순서대로 값이 올라감
  //@PrimaryGeneratedColumn('uuid') -> asdfa-asdf-asdfasdf-1232asdfad-213123

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({
    // 데이터베이스에서 인진하는 컬럼 타입
    // 자동으로 유추됨
    type: 'varchar',

    //데이터베이스 컬럼 이름
    // 프로퍼티 이름으로 자동 유추됨
    name: 'title',

    // 값의 길이
    // 입력할 수 있는 글자의 길이
    length: 300,

    // null이 가능한지
    nullable: true,

    // true이면 처음 저장할 때만 값지정 가능
    // 이후에는 값 변경 불가능 -> 업데이트를 못하게 한다는 말
    update: true,

    // find()를 실행할 때 기본으로 값을 불러올지
    // 기본값이 true, 만약 false를 하고 가져오고 싶으면 find부분에서 select를 해야 함
    select: true,

    // 기본값
    // 아무것도 생성 안했을 때 뜨는 값
    default: 'default value',

    // 컬럼중에서 유일무이한 값이 돼야하는지
    unique: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜의 시간이 자동으로 찍힘
  @CreateDateColumn()
  createdAt: Date;

  // 업데이트 되는 날짜의 시간이 자동으로 찍힘
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될 때마다 1씩 올라감
  // 처음 생성되면 1임
  // save() 함수가 몇 번 불렀는지 기억함.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할 때마다 항상 같이 가져올 relation
    eager: false,

    // 저장할 때 relation을 한 번에 같이 저장 가능
    cascade: true,

    // 정보 null이 가능한지
    nullable: true,

    // 관계가 삭제됐을 때
    // no action -> 아무것도 안함
    // cascade -> 참조하는 Row도 같이 삭제
    // set null -> 참조하는 Row에서 참조 id를 null로 변경
    // set default -> 기본 세팅으로 설정(테이블의 기본 새팅)
    // restrict -> 참조하고 있는 Row가 있는 경우 참조당하는 Row 삭제 불가
    onDelete: 'CASCADE',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
