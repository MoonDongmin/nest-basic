import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
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

  @Post('users')
  postUser() {
    return this.userRepository.save({
      // title: 'test title',
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져옴
      // 만약 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져옴
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        version: true,
        profile: {
          id: true,
        },
      },

      // 필터링할 조건을 입력하게 된다.
      // and 조건으로 묶임, or 조건 하려면 []로 들고와야 함
      where: {
        profile: {
          id: 3,
        },
      },

      // 관계를 가져오는 법
      // 이를 추가하면 select, where에서 쓸 수 있음.
      relations: {
        profile: true,
      },

      // 오름차순 / 내림차순
      // asc / desc
      order: {
        id: 'ASC',
      },

      // 처음 몇 개를 제외할지,
      // 정렬하고 몇 개를 제외할지...
      skip: 0,

      // 몇 개를 가지고 올지
      take: 0,
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
