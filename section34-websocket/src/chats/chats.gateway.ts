import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsService } from './chats.service';
import { EnterChatDto } from './dto/enter-chat.dto';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ChatMessagesService } from './messages/messages.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { SocketCatchHttpExceptionFilter } from '../common/exception-filter/socket-catch-http.exception-filter';

// 소켓io가 연결하게 되는 곳을 gateway라고 부름
@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: ChatMessagesService,
  ) {}

  // server 변수에 server 객체를 NestJS가 넣어줌
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  // 챗 방을 만듦

  @UsePipes(
    new ValidationPipe({
      // query에 실제로 값을 넣은 적이 없다면 원래 그대로 반환을 해줘야 하는데,
      // 이를 설정해주면 값을 넣지 않아도 DTO에 넣은 값을 넣은 채로 해줌
      transform: true,
      transformOptions: {
        // class-validator를 기준으로 @IsNumber()로 되어 있으면,
        // 자동으로 number로 변환을 해줌
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseFilters(SocketCatchHttpExceptionFilter)
  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  // 채팅방에 들어가게
  @SubscribeMessage('enter_chat')
  async enterChat(
    // 방의 chat ID들을 리스트로 받음
    @MessageBody() data: EnterChatDto,
    // 이 소켓에 연결된 소켓을 들고옴
    @ConnectedSocket() socket: Socket,
  ) {
    for (const chatId of data.chatIds) {
      const exits = await this.chatsService.checkIfChatExists(chatId);
      if (!exits) {
        throw new WsException({
          code: 100,
          message: `존재하지 않는 chat 입니다. chatId: ${chatId}`,
        });
      }
    }
    // socket.join()
    socket.join(data.chatIds.map((x) => x.toString()));
  }

  // socket.on('send_message', (message)=>{console.log(message)});
  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chatExists = await this.chatsService.checkIfChatExists(dto.chatId);

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. Chat ID: ${dto.chatId}`,
      );
    }
    const message = await this.messagesService.createMessage(dto);

    // 나를 제외한 사람들에게 감
    socket
      .to(message.chat.id.toString())
      .emit('receive_message', message.message);
    // 연결된 모든 소켓에게 receive_message 이벤트를 받는 곳에게 다음 메시지를 보내라라는 의미
    // this.server
    //   .in(message.chatId.toString())
    //   .emit('receive_message', message.message);
  }
}
