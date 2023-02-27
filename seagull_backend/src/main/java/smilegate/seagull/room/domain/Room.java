package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@Setter
//@RedisHash(value = "room")
public class Room {
    @Id
    private Long id;
    private String hostId;
    private String roomLink;

    public Room() {
    }

    public static Room create(String name, String roomLink) {
        Room room = new Room();
        room.hostId = name;
        room.roomLink = roomLink;
        return room;
    }
}
