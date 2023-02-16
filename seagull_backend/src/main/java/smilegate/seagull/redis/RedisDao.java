package smilegate.seagull.redis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import smilegate.seagull.room.domain.RoomUser;

import java.util.Set;

@Slf4j
@Component
public class RedisDao {

//    private final RedisTemplate<String, String> redisTemplate;
//
//    @Autowired
//    public RedisDao(RedisTemplate<String, String> redisTemplate) {
//        this.redisTemplate = redisTemplate;
//    }
//
//    public RedisTemplate<String, String> getRedisTemplate() {
//        return this.redisTemplate;
//    }
//
//    public void setSets(String roomLink, String userId){
//        SetOperations<String, String> setData = redisTemplate.opsForSet();
//        setData.add(roomLink, userId);
//        log.info("setSets userId {} : {}",roomLink,setData.pop(roomLink));
//    }
//
//    public Set<String> getAllSets(String key) {
//        SetOperations<String, String> setData = redisTemplate.opsForSet();
//        return setData.members(key);
//    }
//
//    public void setValues(String key, String value) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set(key, value);
//    }
//
//    public String getValues(String key) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        return valueOperations.get(key);
//    }
//
//    public void deleteValues(String pattern) {
//        Set<String> keys = redisTemplate.keys(pattern);
//        if(keys != null) {
//            redisTemplate.delete(keys);
//        }
//    }
}
