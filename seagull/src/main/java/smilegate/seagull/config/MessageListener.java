package smilegate.seagull.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import smilegate.seagull.model.ChatMessage;
import smilegate.seagull.util.KafkaConstants;

@Slf4j
@Component
public class MessageListener {

    @Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(ChatMessage chatMessage) {
        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/group", chatMessage);
    }
}
