package smilegate.seagull.chatting.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import smilegate.seagull.chatting.domain.ChatMessage;

public class ChattingHandler extends TextWebSocketHandler {
    //  sock.send()가 실행되면 데이터가 오게되는 곳

//    ObjectMapper objectMapper = new ObjectMapper();
//    ChattingRoomRepository repository = new ChattingRoomRepository();
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String payload = message.getPayload();
//        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
//        ChattingRoom chatRoom = repository.getChatRoom(chatMessage.getChatRoomId());
//        chatRoom.handleMessage(session, chatMessage, objectMapper);
//
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        repository.remove(session);
//
//    }
}
