import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesModel } from './entity/messages.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import { BasePaginateDto } from '../../common/dto/base-paginate.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(MessagesModel)
    private readonly messageRepository: Repository<MessagesModel>,
    private readonly commonService: CommonService,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const message = await this.messageRepository.save({
      chat: {
        id: dto.chatId,
      },
      author: {
        id: dto.authorId,
      },
      message: dto.message,
    });

    return this.messageRepository.findOne({
      where: {
        id: message.id,
      },
      relations: {
        chat: true,
      },
    });
  }

  paginateMessages(
    dto: BasePaginateDto,
    overrideFindOptions: FindManyOptions<MessagesModel>,
  ) {
    return this.commonService.paginate(
      dto,
      this.messageRepository,
      overrideFindOptions,
      'messages',
    );
  }
}
