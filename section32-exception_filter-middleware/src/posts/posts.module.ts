import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { ImageModel } from './entities/image.entity';
import { PostImagesService } from './image/images.service';

@Module({
  imports: [
    // 해당 모델의 레포지토리를 주입할 떄 forFeature를 씀
    TypeOrmModule.forFeature([PostsModel, ImageModel]),
    AuthModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostImagesService],
})

// 미들웨어 적용하기
export class PostsModule {}
