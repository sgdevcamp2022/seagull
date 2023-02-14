package smilegate.seagull.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import smilegate.seagull.room.domain.RoomUser;

import java.util.Set;

@Component
public class RedisDao {
    private final RedisTemplate<String, String> redisTemplate;

    public RedisDao(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setSets(String key, String userId){
        SetOperations<String, String> setData = redisTemplate.opsForSet();
        setData.add(key, userId);
    }

    public Set<String> getAllSets(String key) {
        SetOperations<String, String> setData = redisTemplate.opsForSet();
        return setData.members(key);
    }

    public void setValues(String key, String value) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public String getValues(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void deleteValues(String pattern) {
        Set<String> keys = redisTemplate.keys(pattern);
        if(keys != null) {
            redisTemplate.delete(keys);
        }
    }
}
