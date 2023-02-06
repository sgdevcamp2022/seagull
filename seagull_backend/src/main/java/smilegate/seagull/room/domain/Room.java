package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;
import smilegate.seagull.user.domain.User;

@Getter
@Setter
public class Room {
    private Long id;
    private String roomName;
    private User roomHost;
    private String roomLink;

    public Room() {
    }

    public Room(Long id, String roomName, User roomHost, String roomLink) {
        this.id = id;
        this.roomName = roomName;
        this.roomHost = roomHost;
        this.roomLink = roomLink;
    }


}
