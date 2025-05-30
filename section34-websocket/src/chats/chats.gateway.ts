import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// 소켓io가 연결하게 되는 곳을 gateway라고 부름
@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  // server 변수에 server 객체를 NestJS가 넣어줌
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  // 채팅방에 들어가게
  @SubscribeMessage('enter_chat')
  enterChat(
    // 방의 chat ID들을 리스트로 받음
    @MessageBody() data: number[],
    // 이 소켓에 연결된 소켓을 들고옴
    @ConnectedSocket() socket: Socket,
  ) {
    for (const chatId of data) {
      // socket.join()
      socket.join(chatId.toString());
    }
  }

  // socket.on('send_message', (message)=>{console.log(message)});
  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; chatId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    // 연결된 모든 소켓에게 receive_message 이벤트를 받는 곳에게 다음 메시지를 보내라라는 의미
    this.server
      .in(message.chatId.toString())
      .emit('receive_message', message.message);
  }
}
