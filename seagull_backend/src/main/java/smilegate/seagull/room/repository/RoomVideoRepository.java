package smilegate.seagull.room.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public class RoomVideoRepository {
    private final static String ROOMVIDEO = "ROOM_VIDEO:";

    private final RedisTemplate<String, String> redisTemplate;
    private static ListOperations<String, String> listData;

    @Autowired
    public RoomVideoRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
        listData = redisTemplate.opsForList();
    }

    public void setURL(String roomLink, String userId){
        listData.leftPush(ROOMVIDEO+roomLink, userId);
    }

    public void deleteUrlAll(String roomLink) {
        redisTemplate.delete(ROOMVIDEO + roomLink);
    }

    public String findByRoomLink(String roomLink) {
        if(!redisTemplate.hasKey(ROOMVIDEO + roomLink)) return "";
        String popData = listData.leftPop(ROOMVIDEO+roomLink);
        listData.leftPush(ROOMVIDEO+roomLink, popData);
        return popData;
    }
}

