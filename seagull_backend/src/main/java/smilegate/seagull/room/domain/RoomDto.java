package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomDto {
    private String hostId;
    private String roomLink;

    public RoomDto(String hostId, String roomLink) {
        this.hostId = hostId;
        this.roomLink = roomLink;
    }
}
