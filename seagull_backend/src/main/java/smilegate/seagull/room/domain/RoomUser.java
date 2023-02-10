package smilegate.seagull.room.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomUser {
    private Long id;
    private String roomId;
    private String userId;
}
