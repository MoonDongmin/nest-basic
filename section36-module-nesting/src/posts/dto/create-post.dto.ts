import { PostsModel } from '../entity/posts.entity';
import { PickType }   from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

// Pick, Omit, Partial -> Type을 반환
// PickType, OmitType, PartialType -> 값을 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {
  @IsString({
    // 배열일 때 이걸 해줘야 함.
    each: true,
  })
  @IsOptional()
  images?: string[] = [];
}
