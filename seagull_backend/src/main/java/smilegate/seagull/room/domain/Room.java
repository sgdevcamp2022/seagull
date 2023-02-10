package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.web.socket.WebSocketSession;
import smilegate.seagull.user.domain.User;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@RedisHash(value = "room")
public class Room {
    @Id
    private Long id;
    private String hostId;
    private String roomLink;

    public Room(Long id, String hostId, String roomLink) {
        this.id = id;
        this.hostId = hostId;
        this.roomLink = roomLink;
    }

    public Room(String hostId, String roomLink) {
        this.hostId = hostId;
        this.roomLink = roomLink;
    }

    public Room() {
    }

    public static Room create(String name, String roomLink) {
        Room room = new Room();
        room.hostId = name;
        room.roomLink = roomLink;
        return room;
    }
}
