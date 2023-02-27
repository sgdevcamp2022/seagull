package smilegate.seagull.room.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import smilegate.seagull.utils.Base62;

import static org.junit.jupiter.api.Assertions.*;

class RoomServiceTest {

    @Test
    @DisplayName("decodeTest")
    public void decodeTest() {
        int decode = Base62.decode(Long.toString(1));
        System.out.println(decode);
    }

}
