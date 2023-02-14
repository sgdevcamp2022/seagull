package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomUser {
    private String roomLink;
    private String userId;
    private String session;

    public RoomUser(String roomLink, String userId) {
        this.roomLink = roomLink;
        this.userId = userId;
    }

    public RoomUser() {
    }
}
