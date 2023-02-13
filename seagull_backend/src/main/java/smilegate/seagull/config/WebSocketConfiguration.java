package smilegate.seagull.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;
import smilegate.seagull.room.service.RoomService;

import java.util.Iterator;

@EnableWebSocketMessageBroker
@Configuration
@Slf4j
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/my-chat").setAllowedOriginPatterns("http://localhost:8080","http://localhost:5500","http://localhost:3000")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/publish");
        registry.enableSimpleBroker("/subscribe");
    }
}
