package smilegate.seagull.chatting.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ChatMessage implements Serializable {
    private String roomLink;
    private MessageType type;
    private String content;
    private String author;
    private String timestamp; // 메세지 작성된 시간

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        VIDEO
    }
}
