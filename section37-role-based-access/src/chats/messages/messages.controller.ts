import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ChatMessagesService } from './messages.service';
import { BasePaginateDto } from '../../common/dto/base-paginate.dto';

@Controller('chats/:cid/message')
export class MessagesController {
  constructor(private readonly messagesService: ChatMessagesService) {}

  @Get()
  paginateMessage(
    @Param('cid', ParseIntPipe) id: number,
    @Query() dto: BasePaginateDto,
  ) {
    return this.messagesService.paginateMessages(dto, {
      where: {
        chat: { id },
      },
      relations: {
        author: true,
        chat: true,
      },
    });
  }
}
