package smilegate.seagull.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import smilegate.seagull.chatting.domain.ChatMessage;

import java.util.HashMap;
import java.util.Map;

//@EnableKafka
//@Configuration
public class ListenerConfiguration {

//    @Value("${kafka.broker}")
//    public String KAFKA_BROKER; // 생성한 토픽의 이름
//
//    @Value("${kafka.groupId}")
//    public String GROUP_ID; // 생성한 토픽의 이름
//
//    @Bean
//    ConcurrentKafkaListenerContainerFactory<String, ChatMessage> kafkaListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, ChatMessage> factory = new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(consumerFactory());
//        return factory;
//    }
//
//    @Bean
//    public ConsumerFactory<String, ChatMessage> consumerFactory() {
//        return new DefaultKafkaConsumerFactory<>(consumerConfigurations(), new StringDeserializer(), new JsonDeserializer<>(ChatMessage.class));
//    }
//
//    @Bean
//    public Map<String, Object> consumerConfigurations() {
//        Map<String, Object> configurations = new HashMap<>();
//        configurations.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KAFKA_BROKER);
//        configurations.put(ConsumerConfig.GROUP_ID_CONFIG, GROUP_ID);
//        configurations.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        configurations.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
//        configurations.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
//        return configurations;
//    }
}
