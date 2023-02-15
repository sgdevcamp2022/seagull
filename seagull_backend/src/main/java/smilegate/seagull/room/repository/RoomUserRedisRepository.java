package smilegate.seagull.room.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;
import smilegate.seagull.room.domain.RoomUser;

import java.util.Map;
import java.util.Set;

@Slf4j
@Repository
public class RoomUserRedisRepository {

    private final static String ROOMUSER = "ROOM_USER:";

    private final RedisTemplate<String, String> redisTemplate;
    private static SetOperations<String, String> setData; // 참가자 리스트

    @Autowired
    public RoomUserRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        setData = redisTemplate.opsForSet();
    }

    public void setUser(String roomLink, String userId){
        setData.add(ROOMUSER+roomLink, userId);
    }

    public Set<String> getUserAll(String roomLink) {
        return setData.members(ROOMUSER+roomLink);
    }

    public void deleteUser(String roomLink, String userId) {
        setData.remove(ROOMUSER + roomLink, userId);
    }

    public void deleteUserAll(String roomLink) {
        setData.remove(ROOMUSER+roomLink);
    }
}
