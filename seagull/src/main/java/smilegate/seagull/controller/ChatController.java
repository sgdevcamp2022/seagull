package smilegate.seagull.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;
import smilegate.seagull.model.ChatMessage;
import smilegate.seagull.util.KafkaConstants;

import java.time.LocalDateTime;

@Slf4j
//@CrossOrigin("*")
@RestController
@RequestMapping("/kafka")
public class ChatController {

    @Autowired
    private KafkaTemplate<String, ChatMessage> kafkaTemplate;

    @RequestMapping("/publish")
    public void sendMessage(@RequestBody ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now().toString());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, chatMessage).get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @MessageMapping("/sendMessage") // 클라이언트에서 보내는 메세지 매핑
    @SendTo("/topic/group")
    public ChatMessage broadcastGroupMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/group")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getAuthor());
        return chatMessage;
    }

}
