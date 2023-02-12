package smilegate.seagull.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.chatting.domain.ChatMessage;
import smilegate.seagull.room.domain.Room;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/kafka")
@CrossOrigin(origins = "http://localhost:5500, http://localhost:3000", allowedHeaders = "*")
public class ChatController {

//    @Value("${kafka.kafka-topic}")
//    public String KAFKA_TOPIC; // 생성한 토픽의 이름
//
//    @Autowired
//    private KafkaTemplate<String, ChatMessage> kafkaTemplate;
//
//    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
//    @RequestMapping("/publish")
//    public void sendMessage(@RequestBody ChatMessage chatMessage) {
//        chatMessage.setTimestamp(LocalDateTime.now().toString());
//        try {
//            kafkaTemplate.send(KAFKA_TOPIC, chatMessage).get();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

    @MessageMapping("/sendMessage") // 클라이언트에서 보내는 메세지 매핑
    @SendTo("/topic/group")
    public ChatMessage broadcastGroupMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/group")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getAuthor());
        return chatMessage;
    }
}
