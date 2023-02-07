package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import smilegate.seagull.user.domain.User;

@Getter
@Setter
@RedisHash(value = "room")
public class Room {

    @Id
    private Long id;
    private Long hostId;
    private String roomName;
    private String roomLink;

    public Room() {
    }

    public Room(Long id, Long hostId, String roomName, String roomLink) {
        this.id = id;
        this.hostId = hostId;
        this.roomName = roomName;
        this.roomLink = roomLink;
    }
}
