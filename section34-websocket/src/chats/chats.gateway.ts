import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

// 소켓io가 연결하게 되는 곳을 gateway라고 부름
@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    console.log(`on connect called : ${socket.id}`);
  }

  // socket.on('send_message', (message)=>{console.log(message)});
  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() message: string) {
    console.log(message);
  }
}
