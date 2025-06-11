import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginateCommentsDto } from './dto/paginate-comments.dto';
import { AccessTokenGuard } from '../../auth/guard/bearer-token.guard';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { User } from '../../users/decorator/user.decorator';
import { UsersModel } from '../../users/entity/users.entity';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { IsPublic } from '../../common/decorator/is-public.decorator';
import { IsCommentMineOrAdminGuard } from './guard/is-comment-mine-or-admin.guard';
import { TransactionInterceptor } from '../../common/interceptor/transaction.interceptor';
import { QueryRunner } from '../../common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { PostsService } from '../posts.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postService: PostsService,
  ) {}

  /**
   * 1) Entity 생성
   * author -> 작성자
   * post -> 귀속되는 포스트
   * comment -> 실제 댓글 내용
   * likeCount -> 좋아요 갯수
   *
   * id -> PrimaryGeneratedColum
   * createdAt -> 생성 일자
   * updatedAt -> 업데이트 일자
   *
   * 2) GET() pagination
   * 3) GET(':commentId') 특정 Comment 하나 가져오는 기능
   * 4) POST() 코멘트 생성
   * 5) PATCH(':commentId') 특정 comment 업데이터 하는 기능
   * 6) DELETE(':commentId') 특정 comment 삭제하는 기능
   */

  @Get()
  @IsPublic()
  getComments(
    @Query() query: PaginateCommentsDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentsService.paginateComments(query, postId);
  }

  @Get(':commentId')
  @IsPublic()
  getComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async postComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: CreateCommentsDto,
    @User() user: UsersModel,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.commentsService.createComment(
      body,
      postId,
      user,
      qr,
    );

    await this.postService.incrementCommentCount(postId, qr);

    return result;
  }

  @Patch(':commentId')
  @UseGuards(IsCommentMineOrAdminGuard)
  async patchComment(
    @Body() body: UpdateCommentsDto,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.commentsService.updateComment(body, commentId);
  }

  @Delete(':commentId')
  @UseInterceptors(TransactionInterceptor)
  @UseGuards(IsCommentMineOrAdminGuard)
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @QueryRunner() qr: QR,
  ) {
    const result = await this.commentsService.deleteComment(commentId, qr);
    await this.postService.decrementCommentCount(postId, qr);

    return result;
  }
}
