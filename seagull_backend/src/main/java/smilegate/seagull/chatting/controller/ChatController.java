package smilegate.seagull.chatting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import smilegate.seagull.chatting.domain.ChatMessage;
import smilegate.seagull.room.domain.Room;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestController
@RequestMapping("/chatting")
@CrossOrigin(origins = "http://localhost:5500, http://localhost:3000", allowedHeaders = "*")
public class ChatController {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/sendMessage/{roomLink}") // 클라이언트에서 보내는 메세지 매핑
    public ChatMessage broadcastGroupMessage(@DestinationVariable(value = "roomLink") String roomLink, @Payload ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now(ZoneId.of("Asia/Seoul")).toString());
        messagingTemplate.convertAndSend("/subscribe/group/" + roomLink, chatMessage);
        return chatMessage;
    }
}
