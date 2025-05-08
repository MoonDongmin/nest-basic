import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - DB에 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@naver.com',
    // });

    // 모델에 해당하는 객체 생성 및 DB 저장
    // const user2 = this.userRepository.save({
    //   email: 'test@naver.com',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가로 입력된 값으로 데이터베이스에 가져온 값들을 대체함
    // 저장하지 않음 (find함수와 create함수가 섞인 것)
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: '123@naver.cooom',
    // });

    // 삭제하기
    // await this.userRepository.delete({
    //   id: 101,
    // });

    // 조건에 해당되는 모든 row에세 count 값을 증가 시키겠다
    // await this.userRepository.increment(
    //   {
    //     id: 304,
    //   },
    //   'count',
    //   2,
    // );

    // 값을 감소시킴
    // await this.userRepository.decrement(
    //   {
    //     id: 304,
    //   },
    //   'count',
    //   2,
    // );

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최솟값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최대값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // 찾기
    // const users = await this.userRepository.find({});

    // 단 하나의 사용자
    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    // 값들을 찾고 몇 개의 값만 들고 와라
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return true;
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@naver.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져옴
      // 만약 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져옴
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   },
      // },

      // 필터링할 조건을 입력하게 된다.
      // and 조건으로 묶임, or 조건 하려면 []로 들고와야 함
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // 적은 경우 가져오기
        // id: LessThan(30),
        // 적은 경우 or 같은 경우
        // id: LessThanOrEqual(30),
        // 많은 경우 가져오기
        // id: MoreThan(30),
        // 같거나 많은 경우
        // id: MoreThanOrEqual(30),
        // 같은 값가져오기
        // id: Equal(30),
        // 유사값 가져오기
        // email: Like('%naver%'),
        // 대소문자 구분 안하는 유사값 가져오기
        // email: ILike('%NAVER%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러 개의 ㄱ밧
        // id: In([1, 3, 5, 7, 99]),
        // ID가 Null인 경우 가져오기
        // id: IsNull(),
      },

      // 관계를 가져오는 법
      // 이를 추가하면 select, where에서 쓸 수 있음.
      // relations: {
      //   profile: true,
      // },

      // 오름차순 / 내림차순
      // asc / desc
      // order: {
      //   id: 'ASC',
      // },

      // 처음 몇 개를 제외할지,
      // 정렬하고 몇 개를 제외할지...
      // skip: 0,

      // 몇 개를 가지고 올지
      // take: 0,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });

    return this.userRepository.save({
      ...user,
    });
  }

  @Delete('users/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('users/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@namver.com',
    });

    const profile = await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    });
    return user;
  }

  @Post('users/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: '123@navmer.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }

  @Post('users/posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS',
    });

    const post2 = await this.postRepository.save({
      title: 'NodeJS',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('users/posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('users/tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
