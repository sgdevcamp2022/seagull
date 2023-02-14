package smilegate.seagull.room.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Slf4j
@Repository
public class RoomUserRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private static SetOperations<String, String> setData;

    @Autowired
    public RoomUserRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        setData = redisTemplate.opsForSet();
    }

    public void setSets(String roomLink, String userId){
        setData.add(roomLink, userId);
//        log.info("setSets userId {} : {}",roomLink,setData.pop(roomLink));
    }

    public Long getSetSize(String roomLink){
        return setData.size(roomLink);
    }

    public Set<String> getAllSets(String key) {
        return setData.members(key);
    }

    public Set<String> deleteSets(String key, String userId) {
        setData.remove(key, userId);
        return setData.members(key);
    }
}
