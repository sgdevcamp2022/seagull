package smilegate.seagull.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import smilegate.seagull.chatting.domain.ChatMessage;

@Slf4j
//@Component
public class MessageListener {

    @Autowired
    private SimpMessagingTemplate template;

    @KafkaListener(topics = "kafka-chat", groupId = "chatting")
    public void listen(ChatMessage chatMessage) {
        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/group", chatMessage);
    }
}
