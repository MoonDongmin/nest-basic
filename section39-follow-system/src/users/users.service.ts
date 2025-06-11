import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersModel } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollowersModel } from './entity/user-followers.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    @InjectRepository(UserFollowersModel)
    private readonly userFollowerRepository: Repository<UserFollowersModel>,
  ) {}

  async createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
    // 1) nickname 중복이 없는지 확인
    // exist() -> 만약에 조건에 해당되는 값이 있으면 true
    const nicknameExists = await this.usersRepository.exists({
      where: {
        nickname: user.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 nickname 입니다!');
    }

    const emailExists = await this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 email 입니다!');
    }

    const userObject = this.usersRepository.create({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async followUser(followerId: number, followeeId: number) {
    const result = await this.userFollowerRepository.save({
      follower: {
        id: followerId,
      },
      followee: {
        id: followeeId,
      },
    });

    return true;
  }

  async getFollowers(userId: number): Promise<UsersModel[]> {
    /**
     * [
     *   {
     *     id: number;
     *     follower: UsersModel;
     *     followee: UsersModel;
     *     isConfirmed: boolean;
     *     createdAt: Date;
     *     updatedAt: Date;
     *   }
     * ]
     */
    const result = await this.userFollowerRepository.find({
      where: {
        followee: {
          id: userId,
        },
      },
      relations: {
        follower: true,
        followee: true,
      },
    });

    return result.map((x) => x.follower);
  }
}
