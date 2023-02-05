package smilegate.seagull.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KafkaConstants {

    @Value("${kafka.kafka-topic}")
    public String KAFKA_TOPIC; // 생성한 토픽의 이름

    @Value("${kafka.broker}")
    public String KAFKA_BROKER; // 생성한 토픽의 이름

    @Value("${kafka.groupId}")
    public String GROUP_ID; // 생성한 토픽의 이름

//
//    public static final String GROUP_ID = "chatting"; // consumer를 식별할 수 있는 그룹
//    public static final String KAFKA_BROKER = "3.34.161.56:9092"; // Kafka 클러스터에 연결하기 위한 호스트:포트 값
}
