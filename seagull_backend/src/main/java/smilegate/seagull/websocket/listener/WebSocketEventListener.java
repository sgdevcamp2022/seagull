package smilegate.seagull.websocket.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import smilegate.seagull.room.domain.RoomUser;
import smilegate.seagull.room.service.EnterUserService;

import java.security.Principal;
import java.util.Set;

@Slf4j
@Component
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;
    private final EnterUserService enterUserService;

    @Autowired
    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate, EnterUserService enterUserService) {
        this.messagingTemplate = messagingTemplate;
        this.enterUserService = enterUserService;
    }


    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("disconnect socket connection: {}",event.getMessage());

//
////            ChatMessage chatMessage = new ChatMessage();
////            chatMessage.setType(ChatMessage.MessageType.LEAVE);
////            chatMessage.setAuthor(username);
////            chatMessage.setTimestamp(LocalDateTime.now().toString());
//        messagingTemplate.convertAndSend("/subscribe/room/delete/" + roomUser.getRoomLink(), userList);
    }
}
