package smilegate.seagull.room.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

@Repository
public class RoomRedisRepository {

    private final static String ROOM = "ROOM:";

    private final RedisTemplate<String, String> redisTemplate;
    private static SetOperations<String, String> setDataRoom; // 방 리스트

    @Autowired
    public RoomRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        setDataRoom = redisTemplate.opsForSet();
    }

    public String getRoomHost(String roomLink) {
        String pop = setDataRoom.pop(roomLink);
        setDataRoom.add(roomLink, pop);
        return pop;
    }

    public void setRoom(String roomLink, String userId) {
        setDataRoom.add(ROOM+roomLink, userId);
    }

    public void deleteRoom(String roomLink) {
        redisTemplate.delete(ROOM+roomLink);
    }

    public Long getRoomCount(String roomLink) {
        return setDataRoom.size(ROOM+roomLink);
    }

    public Boolean hostCheck(String roomLink, String userId) {
        return setDataRoom.isMember(ROOM+roomLink, userId);
    }
}
