package smilegate.seagull.config;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;
import smilegate.seagull.chatting.domain.ChatMessage;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class ProducerConfiguration {

    @Value("${kafka.broker}")
    public String KAFKA_BROKER; // 카프카 서버 주소

    @Bean
    public KafkaTemplate<String, ChatMessage> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    @Bean
    public ProducerFactory<String, ChatMessage> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigurations());
    }

    @Bean
    public Map<String, Object> producerConfigurations() {
        Map<String, Object> configurations = new HashMap<>(); // 카프카 프로듀서 객체 생성
        configurations.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_BROKER); // 카프카 실행 주소
        configurations.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class); // 데이터,키 직렬화
        configurations.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return configurations;
    }


}
