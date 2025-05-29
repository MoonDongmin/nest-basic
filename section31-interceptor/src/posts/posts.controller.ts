import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { UsersModule } from '../users/users.module';
import { User } from '../users/decorator/user.decorator';
import { UsersModel } from '../users/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageModelType } from './entities/image.entity';
import { DataSource } from 'typeorm';
import { PostImagesService } from './image/images.service';
import { LogInterceptor } from '../common/interceptor/log.interceptor';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly dataSource: DataSource,
    private readonly postImagesService: PostImagesService,
  ) {}

  // 1) GET /posts
  // 모든 post를 다 가져옴
  @Get()
  @UseInterceptors(LogInterceptor)
  async getPosts(@Query() query: PaginatePostDto) {
    return this.postsService.paginatePosts(query);
  }

  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postPostRandom(@User() user: UsersModel) {
    await this.postsService.generatePosts(user.id);
    return true;
  }

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져옴
  // 예를 들어서 id = 1일 경우 id가 1인 프로스트를 가져옴
  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  // POST를 생성함
  @Post()
  @UseGuards(AccessTokenGuard)
  async postPosts(
    @User('id') userId: number,
    @Body() body: CreatePostDto,
    // @Body('title') title: string,
    // @Body('content') content: string,
  ) {
    // 트랜잭션과 관련된 모든 쿼리를 담당할
    // 쿼리 러너를 생성한다.
    const qr = this.dataSource.createQueryRunner();

    // 쿼리 러너에 연결한다.
    await qr.connect();
    // 쿼리 러너에서 트랜잭션을 시작한다.
    // 이 시점부터 같은 쿼리 러너를 사용하면
    // 트랜잭션 안에서 데이터베이스 액션을 실행할 수 있다.

    await qr.startTransaction();
    // 로직 실행

    try {
      const post = await this.postsService.createPost(userId, body, qr);
      for (let i = 0; i < body.images.length; i++) {
        await this.postImagesService.createPostImage(
          {
            post,
            order: i,
            path: body.images[i],
            type: ImageModelType.POST_IMAGE,
          },
          qr,
        );
      }
      await qr.commitTransaction();
      await qr.release();

      return this.postsService.getPostById(post.id);
    } catch (e) {
      // 어떤 에러든 에러가 던져지면
      // 트랜잭션을 종료하고 원래 상태로 되돌린다.
      await qr.rollbackTransaction();
      await qr.release();
      throw new InternalServerErrorException('에러가 났습니다.');
    }
  }

  // 4) Patch /posts/:id
  // id에 해당되는 POST를 변경함
  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
    // @Body('title') title?: string,
    // @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(id, body);
  }

  // 5) DELETE /posts/:id
  // id에 해당되는 POST를 삭제함
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
