package smilegate.seagull.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsuemr {

    @KafkaListener(topics = "Kafka_example", groupId = "group_id")
    public void consumer(String message) {
        log.debug("message : {}",message);
    }
}
