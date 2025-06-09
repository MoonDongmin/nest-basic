import { BasePaginateDto } from '../../common/dto/base-paginate.dto';
import { IsNumber, IsOptional } from 'class-validator';

// BsePaginationDto를 상속했기에 추가하고 싶은 속성이 있으면 그냥 추가만 해주면 됨
export class PaginatePostDto extends BasePaginateDto {
  @IsNumber()
  @IsOptional()
  where__likeCount__more_than: number;

  // @IsString()
  // @IsOptional()
  // where__title__i_like: string;
}
