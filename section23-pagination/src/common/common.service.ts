import { Injectable } from '@nestjs/common';
import { BasePaginateDto } from './dto/base-paginate.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseModel } from './entity/base.entity';

@Injectable()
export class CommonService {
  paginate<T extends BaseModel>(
    dto: BasePaginateDto,
    respository: Repository<T>,
    overrideFindOptions: FindManyOptions<T>,
    path: string,
  ) {}
}
