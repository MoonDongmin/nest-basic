import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString } from 'class-validator';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';

// Pick, Omit, Partial -> Type을 반환
// PickType, OmitType, PartialType -> 값을 반환
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString({
    message: stringValidationMessage,
  })
  @IsOptional({
    message: stringValidationMessage,
  })
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
