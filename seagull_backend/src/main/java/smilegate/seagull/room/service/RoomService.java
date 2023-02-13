package smilegate.seagull.room.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import smilegate.seagull.redis.RedisDao;
import smilegate.seagull.room.domain.Room;
import smilegate.seagull.room.repository.RoomRedisRepository;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
public class RoomService {

    @Autowired
    private RoomRedisRepository roomRedisRepository;

    private final RedisDao redisDao;

    @Autowired
    public RoomService(RedisDao redisDao) {
        this.redisDao = redisDao;
    }

    @PostConstruct
    public void init() { // 테스트용 더미 데이터
        String roomLink1 = generateRoomLink("jun");
        String roomLink2 = generateRoomLink("pok");
        String roomLink3 = generateRoomLink("woc");
        redisDao.setValues(roomLink1,"jun");
        redisDao.setValues(roomLink2,"pok");
        redisDao.setValues(roomLink3,"woc");
    }

    public Room createRoom(String userId) {
        String roomLink = generateRoomLink(userId);
        Room room = Room.create(userId, roomLink);
        Room saveRoom = roomRedisRepository.save(room);
        redisDao.setValues(userId, roomLink);
        return saveRoom;
    }

    public String generateRoomLink(String userId) {
        String encodedString = Base64.getEncoder().encodeToString(userId.getBytes());
        return encodedString;
    }

    public Optional<Room> deleteRoom(Long roomId) {
        Optional<Room> room = roomRedisRepository.findById(roomId);
        if(room.isPresent()) roomRedisRepository.delete(room.get());
        return Optional.empty();
    }

    public Optional<Room> findRoomLink(String roomLink) {
        Optional<Room> byRoomLink = roomRedisRepository.findByRoomLink(roomLink);
        if(byRoomLink.isPresent()) return byRoomLink;
        return Optional.empty();
    }

}
