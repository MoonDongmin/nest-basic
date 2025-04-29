import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Version } from '@nestjs/common';

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
  title: string;

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
}
